// Images taken from https://www.insectimages.org/index.cfm

const parseHTML = (tableBody, data) => {

    let html = "";
    data.forEach(element => {
        const tr = document.createElement('tr');
        tr.className = 'teble-row';
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
    console.log(response);
    return response.json();
}).then(data => {
    const dummy = data.reports;
    console.log('DUMMY', dummy);

    let tableBody = document.getElementById('table-body');
    parseHTML(tableBody,dummy);
}).catch(e => {
    console.log('Si se abre el index.html a secas en el navegador no funciona el fetch :c')
    console.error(e)

    const dummy = [
        {
           "fecha": "2021-03-29 13:21",
           "comuna": "La Florida",
           "sector": "Vicuña Mackena",
           "contacto": "Jorge el curioso",
           "total_avistamientos": 5,
           "total_fotos": 5
        },
        {
            "fecha": "2021-03-27 10:03",
            "comuna": "Providencia",
            "sector": "Plaza Italia",
            "contacto": "Jorge el curioso",
            "total_avistamientos": 5,
            "total_fotos": 5
         },
         {
             "fecha": "2021-03-27 10:03",
             "comuna": "Providencia",
             "sector": "Plaza Italia",
             "contacto": "Jorge el curioso",
             "total_avistamientos": 5,
             "total_fotos": 5
          }
    ];

    let tableBody = document.getElementById('table-body');
    parseHTML(tableBody,dummy);
});