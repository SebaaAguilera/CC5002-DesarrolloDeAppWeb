function parseHTML(tableBody, data) {
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

function paginator(data) {
    const paginator = document.getElementById('paginator');
    const pagesNumber = Math.ceil(data.length / 5 );
    for (let i = 1; i <= pagesNumber; i++) {
        a = document.createElement('a');
        a.innerHTML = i;
        a.onclick = () => {
            moveToPage(i)
        }
        paginator.appendChild(a)
        if (i < pagesNumber) {
            span = document.createElement('span');
            span.innerHTML = ' - ';
            paginator.appendChild(span);
        }   
    }
}

function moveToPage(pageNumber) {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    parseHTML(tableBody, reports.slice(5 * (pageNumber-1),5 * pageNumber));
    let page = document.getElementById('page');
    page.innerHTML = pageNumber

}


/* **** MAIN **** */

let reports;

fetch('../cgi-bin/reports.py').then(response => {
    console.debug('CGI RESPONSE', response);
    return response.json();
}).then(data => {
    reports = data.Result;
    console.debug('REPORT LIST', reports);
    paginator(reports)
    moveToPage(1)
}).catch(e => {
    console.error(e)
});