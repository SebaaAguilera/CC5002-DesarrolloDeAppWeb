// Images taken from https://www.insectimages.org/index.cfm

const parseHTML = (data) => {
    let html = "";
    data.forEach(element => {
        html = html.concat(`
            <div class="home-report">
                <div class="description">
                    <p><b>Fecha:</b> ${element.fecha}</p>
                    <p><b>Comuna:</b> ${element.comuna}</p>
                    <p><b>Sector:</b> ${element.sector}</p>
                    <p><b>Tipo:</b> ${element.tipo}</p>
                </div>
                <div class="image">
                    <img src="${element.foto}" alt="report-img">
                </div>
            </div>`);
    });
    return html
};

/* **** MAIN **** */

fetch('./cgi-bin/last_reports.py').then(response => {
    console.debug('CGI RESPONSE', response);
    return response.json();
}).then(data => {
    const result = data.Result;
    console.debug('LAST 5 ',data);
    let lastReports = document.getElementById('lastReports');
    lastReports.innerHTML = parseHTML(result);
}).catch(e => {
    console.error(e)
});