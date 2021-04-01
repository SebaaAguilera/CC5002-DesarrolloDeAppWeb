let regions;

function addOptions(array,id) {
    const select = document.forms['formReport'][id];
    array.forEach(element => {
        select.options[select.options.length] = new Option(element.name, element.number)
    });
}

function deleteOptions(id) {
    const selector = document.forms['formReport'][id];
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
})