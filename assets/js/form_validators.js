
const mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const phoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
const datetimeRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;

function validateEmpty(id) {
    const node = document.forms['formReport'][id];
    return node.value == '';
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

function getDatetime() {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function validateDate() {
    const node = document.forms['formReport']['dia-hora-avistamiento'];
    node.value = node.value.substring(0,16);
    const isValid = datetimeRegex.test(node.value);
    console.log('Datetime validation: ', isValid);
    return isValid;
}

// FIX ME tendrá que validar tipo tambien
function validateFiles() {
    const node = document.forms['formReport']['foto-avistamiento'];
    return node.files.length > 0 && node.files.length <= 5;
}

function validateForm() {
    if (validateEmpty('region')) {
        alert('Rellena región');
        return false;
    } else if (validateEmpty('comuna')) {
        alert('Rellena comuna');
        return false;
    } else if (validateEmpty('nombre')) {
        alert('Rellena nombre');
        return false
    } else if (!validateMail()){
        alert('Mail mal formateado o vacío');
        return false;
    } else if  (!validatePhone() && !validateEmpty('celular')) {
        alert('Celular mal escrito');
        return false;
    } else if (!validateDate()) {
        alert('Fecha/hora mal formateada');
        return false;
    } else if (validateEmpty('tipo-avistamiento')) {
        alert('Rellena tipo');
        return false;
    } else if (validateEmpty('estado-avistamiento')) {
        alert('Rellena estado');
        return false;
    } else if (validateFiles()) {
        alert('Debes subur entre 1 y 5 fotos')
        return false
    }
}

/* **** MAIN **** */

const datetime = document.forms['formReport']['dia-hora-avistamiento'];
datetime.value = getDatetime();