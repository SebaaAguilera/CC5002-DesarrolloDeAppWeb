// Images taken from https://www.insectimages.org/index.cfm

let dummy;

fetch('./assets/json/dummy.json')
.then(response => {
    console.log(response);
    return response.json();
})
.then(data => {
    dummy = data.avistamientos.slice(0,5);
    console.log('DUMMY', dummy);

    let html = "";
    dummy.forEach(element => {
        html = html.concat(`
            <div class="home-report">
                <div class="description">
                    <p><b>Fecha:</b> ${element.fecha}</p>
                    <p><b>Comuna:</b> ${element.comuna}</p>
                    <p><b>Sector:</b> ${element.sector}</p>
                    <p><b>Tipo:</b> ${element.tipo}</p>
                </div>
                <div class="image">
                    <img src="${element.img.src}" alt="${element.img.alt}">
                </div>
            </div>`);
    });


    let lastReports = document.getElementById('lastReports');
    lastReports.innerHTML = html;


})