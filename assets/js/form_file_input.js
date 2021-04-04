/*
 * TO DO:
 * * Si alcanza el tiempo:
 * * Eliminar archivo 
 */

function showFiles(id) {
    const reportFile = id.split('-');
    console.log(reportFile)
    const reportDiv = document.getElementById(`report-${reportFile[2]}`);
    const fileName = reportDiv.children[4].children[1].children[0].children[0].children[1].files.item(0).name
    reportDiv.children[4].children[1].children[0].children[0].children[0].innerHTML = `${fileName}`;

    // const fileInputs = document.getElementsByClassName('file-input-div');
    // for (let i = 0; i < fileInputs.length; i++) {
    //     let node = document.getElementById('file-input-list').children[i].children[0].children[1];
    //     let output = document.getElementsByClassName('file-input-text')[i];
    //     output.innerHTML = node.files.item(0) ? `Archivo: ${node.files.item(0).name}` : 'Subir foto';
    // }
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
        newFileInputDiv.children[0].children[1].setAttribute("id", `foto-avistamineto-${button.split('-')[2]}-${fileInputs.childElementCount}`);
        fileInputList.appendChild(newFileInputDiv);
    }
}