const parseHTML = (tableBody, data) => {

    let html = "";
    data.forEach(element => {
        const tr = document.createElement('tr');
        tr.className = 'table-row';
        tr.onclick = () => {
            location.href = './sampleReport.html';
        }
        tr.innerHTML = `<td>${element.fecha}</td>
                        <td>${element.comuna}</td>
                        <td>${element.sector}</td>
                        <td>${element.contacto}</td>
                        <td>${element.total_avistamientos}</td>
                        <td>${element.total_fotos}</td>`
        tableBody.appendChild(tr);
    });
};

/* **** MAIN **** */

fetch('../assets/json/reports.json').then(response => {
    console.debug('DUMMY RESPONSE', response);
    return response.json();
}).then(data => {
    const dummy = data.reports;
    console.debug('DUMMY', dummy);

    let tableBody = document.getElementById('table-body');
    parseHTML(tableBody,dummy);
}).catch(e => {
    console.error(e)

    const dummy = [
        {
            "fecha": "2020-05-21 13:21",
            "comuna": "La Florida",
            "sector": "Vicuña Mackena",
            "contacto": "Francisco Yamilet",
            "total_avistamientos": 2,
            "total_fotos": 5
        },
        {
            "fecha": "2020-05-27 16:03",
            "comuna": "Providencia",
            "sector": "Plaza Italia",
            "contacto": "Coral Ayala",
            "total_avistamientos": 3,
            "total_fotos": 3
        },
        {
            "fecha": "2020-06-27 10:53",
            "comuna": "Renca",
            "sector": "Cerro",
            "contacto": "Anastasia Rayen",
            "total_avistamientos": 1,
            "total_fotos": 5
        },
        {
            "fecha": "2020-07-30 15:23",
            "comuna": "Providencia",
            "sector": "Parque de la aviación",
            "contacto": "Eva Toribio",
            "total_avistamientos": 2,
            "total_fotos": 3
        },
        {
            "fecha": "2021-02-28 22:04",
            "comuna": "Providencia",
            "sector": "Parque de las esculturas",
            "contacto": "Paz Odalis",
            "total_avistamientos": 5,
            "total_fotos": 5
        }
    ];

    let tableBody = document.getElementById('table-body');
    parseHTML(tableBody,dummy);
});