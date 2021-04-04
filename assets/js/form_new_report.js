/*
 * TO DO
 * Cuando se tenga tiempo:
 * * Ordenar código
 * * id nuevo para fecha, tipo y estado
 * * setear valores vacios en tipo y estado
 */

function newReport() {
    const reportsDiv = document.getElementById('reports')
    const reports = document.getElementsByClassName('report')
    const newReport = reports[reports.length-1].cloneNode(true);
    newReport.setAttribute("id", `report-${reports.length}`);
    newReport.children[0].children[0].innerHTML = `Información de avistamiento n°${reports.length+1}`;

    newReport.children[1].children[1].children[0].value = getDatetime();

    const fileInputList = newReport.children[4].children[1];
    fileInputList.id = `file-input-list-${reports.length}`;
    fileInputList.children[0].children[0].children[0].innerHTML = 'Subir foto';
    fileInputList.children[0].children[0].children[1].value = '';
    fileInputList.children[0].children[0].children[1].id = `foto-avistamiento-${reports.length}-0`;
    fileInputList.children[0].children[1].id = `button-avistamiento-${reports.length}`;

    while (fileInputList.children.length > 1) {
        fileInputList.removeChild(fileInputList.children[fileInputList.children.length-1]);
    };
    
    reportsDiv.appendChild(newReport);
}