function showFiles() {
    const fileInputs = document.getElementsByClassName('file-input-div');
    for (let i = 0; i < fileInputs.length; i++) {
        let node = document.getElementById('file-input-list').children[i].children[0].children[1];
        let output = document.getElementsByClassName('file-input-text')[i];
        output.innerHTML = node.files.item(0) ? `Archivo: ${node.files.item(0).name}`: 'Subir foto';
    }
}

function addFileInput() {
    const fileInputs = document.getElementsByClassName('file-input-div');
    if (fileInputs.length < 5) {
        const fileInputList = document.getElementById('file-input-list');
        const newFileInputDiv = fileInputs[0].cloneNode(true);
        newFileInputDiv.children[0].children[0].innerHTML = 'Subir foto';

        const newInputElement = document.createElement('input');
        newInputElement.setAttribute("type", "file");
        newInputElement.setAttribute("name", `foto-avistamineto-${fileInputs.length}`);
        newInputElement.onchange = () => {
            showFiles();
        };

        newFileInputDiv.children[0].removeChild(newFileInputDiv.children[0].children[1]);
        newFileInputDiv.children[0].appendChild(newInputElement);

        fileInputList.appendChild(newFileInputDiv);
    }
}