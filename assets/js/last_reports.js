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
                    <img src="${element.img.src}" alt="${element.img.alt}">
                </div>
            </div>`);
    });
    return html
};

/* **** MAIN **** */

fetch('./assets/json/dummy.json').then(response => {
    console.log(response);
    return response.json();
}).then(data => {
    const dummy = data.avistamientos.slice(0,5);
    console.log('DUMMY', dummy);

    let lastReports = document.getElementById('lastReports');
    lastReports.innerHTML = parseHTML(dummy);
}).catch(e => {
    console.log('Si se abre el index.html a secas en el navegador no funciona el fetch :c')
    console.error(e)

    const dummy = [
        {
            "fecha": "2021-04-28 10:03",
            "comuna": "Renca",
            "sector": "Cerro",
            "tipo": "insecto",
            "img": {
                "src":"https://bugwoodcloud.org/images/384x256/9009060.jpg",
                "alt":"larva"
            }
         },
        {
           "fecha": "2021-03-29 13:21",
           "comuna": "La Florida",
           "sector": "Vicuña Mackena",
           "tipo": "insecto",
           "img": {
               "src":"https://bugwoodcloud.org/images/384x256/5386131.jpg",
               "alt":"chinita"
           }
        },
        {
            "fecha": "2021-03-27 10:30",
            "comuna": "Providencia",
            "sector": "Plaza Italia",
            "tipo": "arácnido",
            "img": {
                "src":"https://bugwoodcloud.org/images/384x256/5506414.jpg",
                "alt":"tarantula"
            }
         },
         {
            "fecha": "2021-03-25 12:50",
            "comuna": "Providencia",
            "sector": "Parque de la aviación",
            "tipo": "insecto",
            "img": {
                "src":"https://bugwoodcloud.org/images/384x256/5604040.jpg",
                "alt":"mantis"
            }
         },
         {
            "fecha": "2021-03-25 12:50",
            "comuna": "Providencia",
            "sector": "Parque de las esculturas",
            "tipo": "miriápodo",
            "img": {
                "src":"https://bugwoodcloud.org/images/384x256/5473412.jpg",
                "alt":"cienpiés"
            }
         }
    ];

    let lastReports = document.getElementById('lastReports');
    lastReports.innerHTML = parseHTML(dummy);
});