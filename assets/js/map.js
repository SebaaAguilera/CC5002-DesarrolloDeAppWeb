/* **** MAIN **** */

let mymap = L.map('mapid').setView([-33.448890, -70.669265], 13);

fetch('./cgi-bin/map_data.py').then( response => {
    console.debug('CGI RESPONSE', response)
    return response.json()
}).then( data => {
    console.log('data', data)
    data.Result.filter(element => element.coordinates != undefined).forEach(element => {
        let marker = L.marker([
                parseFloat(element.coordinates.lat), 
                parseFloat(element.coordinates.lng)
            ], {title: `${element.nombre}: ${element.cant}`}).addTo(mymap)
        marker.bindPopup(element.details.reduce((acc, val) => {
            let fotosHTML = val.fotos.reduce((acc, val) => {
                acc = acc.concat(`
                        <div class="map-div-img">
                            <img class="map-img" src="./${val[1]+val[2]}" alt="img">
                        </div>`)
                return acc
            }, '')  
            acc = acc.concat(`<div>
                    <span><b>Día y hora: </b> ${val.dia_hora}</span>
                    <br>
                    <span><b>Tipo: </b> ${val.tipo}</span>
                    <span><b>Estado: </b> ${val.estado}.</span>
                    <br>
                    <a href="./cgi-bin/report_detail.py?idAvistamiento=${val.report_id}" target="_blank">(Link del avistamiento)</a>
                    <div class="map-img-list">${fotosHTML}</div>
                    </div>`)
            return acc
        }, '')).openPopup()
    });
})

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG1udGxqYWNrIiwiYSI6ImNrcGJrcTF5cTBmMTUyb3A1MmNvcWYzazEifQ.NBJHl-_3SuUf4-wkYQN3zQ'
}).addTo(mymap)