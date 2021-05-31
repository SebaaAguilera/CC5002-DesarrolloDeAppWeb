/* **** MAIN **** */

let mymap = L.map('mapid').setView([-33.448890, -70.669265], 13);

let jsonCoordinates;
fetch('./cgi-bin/map_data.py').then( response => {
    console.debug('CGI RESPONSE', response)
    return response.json()
}).then( data => {
    console.log('data', data)
    data.Result.forEach(element => {
        let marker = L.marker([parseFloat(element.coordinates.lat), parseFloat(element.coordinates.lng)], {title: `${element.nombre}: ${element.cant}`}).addTo(mymap);
        marker.bindPopup(`<b>${element.nombre}: ${element.cant}</b>`).openPopup();
    });
})

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG1udGxqYWNrIiwiYSI6ImNrcGJrcTF5cTBmMTUyb3A1MmNvcWYzazEifQ.NBJHl-_3SuUf4-wkYQN3zQ'
}).addTo(mymap);