const parseHTML = (tableBody, data) => {

    let html = "";
    data.forEach(element => {
        const tr = document.createElement('tr');
        tr.className = 'table-row';
        tr.onclick = () => {
            location.href = `../cgi-bin/report_detail.py?idAvistamiento=${element.avistamiento_id}`;
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

fetch('../cgi-bin/reports.py').then(response => {
    console.debug('CGI RESPONSE', response);
    return response.json();
}).then(data => {
    const result = data.Result;
    console.debug('REPORT LIST', result);

    let tableBody = document.getElementById('table-body');
    parseHTML(tableBody, result);
}).catch(e => {
    console.error(e)
});