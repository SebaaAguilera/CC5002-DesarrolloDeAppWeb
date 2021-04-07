/* 
 * TO DO
 * Si se tiene tiempo:
 * * cambiar a rojo la caja del input o select que falta llenar o está mal llenado
 */

const mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const phoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
const datetimeRegex = /^([0-9]{4})-([0-1][0-9])-([0-3][0-9])\s([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

function validateEmpty(id) {
    const node = document.forms['formReport'][id];
    return node.value == '' || node.value == null || node.value == undefined;
}

function validateLength(name,length) {
    const node = document.forms['formReport'][name];
    node.value = node.value.substring(0,length);
}

// Place Validation

function validateSector() {
    validateLength('sector',100);
}

// Contact Validation

function validateName() {
    validateLength('sector',200);

}

function validateMail() {
    const node = document.forms['formReport']['email'];
    node.value = node.value.replace(/\s/g, '');
    const isValid = mailRegex.test(node.value);
    console.log('Mail validation: ',isValid);
    return isValid;
}

function validatePhone() {
    const node = document.forms['formReport']['celular'];
    node.value = node.value.replace(/\s/g, '');
    const isValid = phoneRegex.test(node.value);
    console.log('Phone validation: ', isValid);
    return isValid;
}

// Report Valdiation

function getDatetime() {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes =  ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


function validateDate() {
    const nodes = document.getElementsByName('dia-hora-avistamiento');
    let isValid = true;
    nodes.forEach(element => {
        element.value = element.value.substring(0,16);
        isValid = datetimeRegex.test(element.value);
        console.log('Datetime validation: ', isValid);
    });
    return isValid;
}

function validateType () {
    const nodes = document.getElementsByName('tipo-avistamiento');
    let isValid = true;
    nodes.forEach(element => {
        if (element.value == ''){
            isValid = false;
        }
    }); 
    return isValid;
}

function validateStatus() {
    const nodes = document.getElementsByName('estado-avistamiento');
    let isValid = true;
    nodes.forEach(element => {
        if (element.value == ''){
            isValid = false;
        }
    }); 
    return isValid;
}

function validateFiles() {
    const reports = document.getElementsByClassName('report');
    let isValid = true;
    for (let i = 0; i<reports.length; i++) {
        let count = 0;
        const fileInputs = reports[i].children[4].children[1];
        for (let i = 0; i < fileInputs.children.length; i++) {
            let files = fileInputs.children[i].children[0].children[1].files;
            if (files.length > 1) {
                isValid = false;
                break;    
            } else if (files.length == 1 && files.item(0).type.substring(0,5) != 'image') {
                isValid = false;
                break;
            }
            count += files.length;
        }
        if (count == 0 || count > 5) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

function validateForm() {
    validateSector();
    validateName();

    let msg = ''

    if (validateEmpty('region')) {
        msg = 'Rellena región';
    } else if (validateEmpty('comuna')) {
        msg ='Rellena comuna';
    } else if (validateEmpty('nombre')) {
        msg ='Rellena nombre';
    } else if (!validateMail()){
        msg ='Mail mal formateado o vacío';
    } else if  (!validatePhone() && !validateEmpty('celular')) {
        msg ='Celular mal escrito';
    } else if (!validateDate()) {
        msg = 'Fecha/hora mal formateada';
    } else if (!validateType('tipo-avistamiento')) {
        msg = 'Rellena tipo';
    } else if (!validateStatus('estado-avistamiento')) {
        msg ='Rellena estado';
    } else if (!validateFiles()) {
        msg = 'Debes subir entre 1 y 5 ¡imágenes! por avistamiento';
    }

    if (msg != ''){
        alert(msg);
        return false;
    } else {
        return true;
    }

}

/* **** MAIN **** */

const datetime = document.forms['formReport']['dia-hora-avistamiento'];
datetime.value = getDatetime();