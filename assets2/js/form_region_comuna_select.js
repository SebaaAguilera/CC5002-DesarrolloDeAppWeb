
function addOptions(array,name) {
    const select = document.forms['formReport'][name];
    array.forEach(element => {
        select.options[select.options.length] = new Option(element.name, element.number)
    });
}

function deleteOptions(name) {
    const selector = document.forms['formReport'][name];
    while (selector.options.length > 1) {
        selector.remove(1);
    }
    selector.value = '';
}

function updateCommunes() {
    const regionSelect = document.forms['formReport']['region'];
    const regionJSON = regions.find(element => element.number == regionSelect.value);  
    deleteOptions('comuna');
    addOptions(regionJSON.communes,'comuna');
}

/* **** MAIN **** */

let regions;

fetch('../cgi-bin/regiones_comunas2.py').then(response => {
    console.debug('CGI RESPONSE', response)
    return response.json()
}).then(data => {
    
    regions = data.Result;
    console.debug('REGIONES + COMUNAS', regions)
    addOptions(regions,'region');

    const regionValue = document.forms['formReport']['region'].value;
    if (regionValue != '') {
        updateCommunes();
    }

    document.forms['formReport']['region'].onchange = function(){updateCommunes()};
}).catch(e => {
    console.error(e)
    regions = [
        {
            "name": "Arica y Parinacota",
            "number": "15",
            "communes": [
                {"name": "Arica"},
                {"name": "Camarones"},
                {"name": "General Lagos"},
                {"name": "Putre"}
            ]
        },
        {
            "name": "Tarapacá",
            "number": "1",
            "communes": [
                {"name": "Alto Hospicio"},
                {"name": "Camiña"},
                {"name": "Colchane"},
                {"name": "Huara"},
                {"name": "Iquique"},
                {"name": "Pica"},
                {"name": "Pozo Almonte"}
            ]
        }
    ];
    console.debug('REGIONES', regions); 
    addOptions(regions,'region');

    const regionValue = document.forms['formReport']['region'].value;
    if (regionValue != '') {
        updateCommunes();
    }
    document.forms['formReport']['region'].onchange = function(){updateCommunes()};
});