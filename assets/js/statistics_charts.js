import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'

function reportsPerDay(info) {
    const canvas = document.getElementById("chart-cant-avistamientos");
    new Chart(canvas, {
        type: "line",
        data: {
        labels: info.label,
        datasets: [{
            label: 'Cantidad de avistamientos por día',
            borderColor: '#509455',
            fill: false,
            data: info.data
        }]
        },
        options: {
            responsive: true,
        }
    });
}

function reportsByType(info) {
    const canvas = document.getElementById("chart-tipo-avistamientos");
    new Chart(canvas, {
        type: "pie",
        data: {
        labels: info.label,
        datasets: [{
            label: 'Total de avistamientos por tipo',
            data: info.data,
            backgroundColor: ['#509455', '#8f9450', '#6d9450']
        }]
        },
        options: {
            responsive: true,
        }
    });
}


function reportsByStatus(info) {
    const canvas = document.getElementById("chart-estado-avistamientos");
    new Chart(canvas, {
        type: "bar",
        data: {
        labels: info.label,
        datasets: [{
            label: 'Vivos',
            backgroundColor: '#509455',
            data: info.data_vivo
        },
        {
            label: 'Muertos',
            backgroundColor: '#8f9450',
            data: info.data_muerto
        },
        {
            label: 'Desconocido',
            backgroundColor: '#6d9450',
            data: info.data_desconocido
        }]
        },
        options: {
            responsive: true,
        }
    });
}


function getStatistics() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET','../cgi-bin/statistics.py', true)
    xhr.timeout = 3000
    xhr.onload = function (data) {
        const info = JSON.parse(data.currentTarget.responseText)
        reportsPerDay(info.reportsPerDay)
        reportsByType(info.reportsByType)
        reportsByStatus(info.reportsByStatus)
    };
    xhr.onerror = function () {
        console.error('No se pudo obtener la data');
    }

    xhr.send();
}

/* **** MAIN **** */
getStatistics()