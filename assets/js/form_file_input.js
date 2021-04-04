/*
 * TO DO:
 * * Si alcanza el tiempo:
 * * Eliminar archivo 
 */

function showFiles(id) {
    const reportFile = id.split('-');
    console.log(reportFile)
    const reportDiv = document.getElementById(`report-${reportFile[2]}`);
    const fileInputDiv = reportDiv.children[4].children[1].children[reportFile[3]].children[0];
    const fileName = fileInputDiv.children[1].files.item(0).name
    fileInputDiv.children[0].innerHTML = `${fileName}`;
}

function addFileInput(button) {
    console.log(button)
    const report = document.getElementById(`report-${button.split('-')[2]}`)
    const fileInputs = report.children[4].children[1];
    console.log(fileInputs.childElementCount)
    if (fileInputs.childElementCount < 5) {
        const fileInputList = document.getElementById(`file-input-list-${button.split('-')[2]}`);
        const newFileInputDiv = fileInputs.children[fileInputs.childElementCount-1].cloneNode(true);
        newFileInputDiv.children[0].children[0].innerHTML = 'Subir foto';
        newFileInputDiv.children[0].children[1].value = '';
        newFileInputDiv.children[0].children[1].setAttribute("id", `foto-avistamineto-${button.split('-')[2]}-${fileInputs.childElementCount}`);
        fileInputList.appendChild(newFileInputDiv);
    }
}

/* **** MAIN **** */

// Cuando recarga a veces aparece un archivo fantasma
// No es lo ideal, pero controla ese problema
document.getElementById('foto-avistamiento-0-0').value = '';