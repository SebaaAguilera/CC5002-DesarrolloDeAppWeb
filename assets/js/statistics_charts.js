import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'
    
/* **** MAIN **** */

const canvas = document.getElementById("chart-cant-avistamientos");
let chart = new Chart(canvas, {
    type: "line",
    data: {
    labels: [...Array(30).keys()].map(i => i + 1).map(x => x + '/03/2021'), // range(0,25)
    datasets: [{
        label: 'Cantidad de avistamientos por día',
        borderColor: '#509455',
        fill: false,
        data: [1, 2, 3, 2, 5, 3, 2, 3, 2, 6, 4, 5, 3, 4, 5, 7, 5, 3, 5, 5, 6, 7, 3, 6, 5, 6, 4, 5, 3, 7]
    }]
    },
    options: {
        responsive: true,
    }
});

const canvas2 = document.getElementById("chart-tipo-avistamientos");
let chart2 = new Chart(canvas2, {
    type: "pie",
    data: {
    labels: ['Miriápodo', 'Insecto', 'Arácnido'],
    datasets: [{
        label: 'Total de avistamientos por tipo',
        data: [15,17,20],
        backgroundColor: ['#509455', '#8f9450', '#6d9450']
    }]
    },
    options: {
        responsive: true,
    }
});

const canvas3 = document.getElementById("chart-estado-avistamientos");
let chart3 = new Chart(canvas3, {
    type: "bar",
    data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // range(0,32)
    datasets: [{
        label: 'Vivos',
        backgroundColor: '#509455',
        data: [5, 7, 8, 4, 8, 6, 6, 8, 9, 11, 11, 12]
    },
    {
        label: 'Muertos',
        backgroundColor: '#8f9450',
        data: [6, 5, 9, 4, 7, 6, 3, 8, 9, 13, 13, 10]
    },
    {
        label: 'Desconocido',
        backgroundColor: '#6d9450',
        data: [4, 6, 2, 4, 9, 6, 7, 8, 9, 12, 10, 13]
    }]
    },
    options: {
        responsive: true,
    }
});