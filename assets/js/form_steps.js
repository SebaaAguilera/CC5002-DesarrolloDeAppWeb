function openConfirmation() {
    if (validateForm()) {
        // muestra confirmación
        document.getElementById('closed-confirmation-div').id = 'opened-confirmation-div';
        document.getElementById('opened-form-buttons').id = 'closed-form-buttons';

        // Hacer esto recorriendo la colección es equivalente a recorrer un array eliminando archivos xd
        const sectionList = document.getElementsByClassName('form-section');
        sectionList[0].className = 'hidden-form-section';
        sectionList[0].className = 'hidden-form-section';
        sectionList[0].className = 'hidden-form-section';
    }
}

function confirmate() {
    document.getElementById('opened-confirmation-div').id = 'closed-confirmation-div';
    document.getElementById('closed-sent').id = 'opened-sent';
}

function backToForm() {
    document.getElementById('opened-confirmation-div').id = 'closed-confirmation-div';
    const sectionList = document.getElementsByClassName('hidden-form-section');
    sectionList[0].className = 'form-section';
    sectionList[0].className = 'form-section';
    sectionList[0].className = 'form-section';
    document.getElementById('closed-form-buttons').id = 'opened-form-buttons';

}