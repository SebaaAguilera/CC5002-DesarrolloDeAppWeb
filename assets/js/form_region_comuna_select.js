let regions;

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

fetch('../assets/json/regions.json').then(response => {
    return response.json();
}).then(data => {
    // global: regions
    regions = data.regions;
    addOptions(regions,'region');

    const regionValue = document.forms['formReport']['region'];
    if (regionValue != '') {
        updateCommunes();
    }
})