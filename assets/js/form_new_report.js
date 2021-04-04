function newReport() {
    const reportsDiv = document.getElementById('reports')
    const reports = document.getElementsByClassName('report')
    const newReport = reports[reports.length-1].cloneNode(true);
    newReport.setAttribute("id", `report-${reports.length}`);
    newReport.children[0].children[0].innerHTML = `Información de avistamiento n°${reports.length+1}`;
    console.log(newReport.children[4].children[1].children[0].children[1])
    newReport.children[4].children[1].id = `file-input-list-${reports.length}`
    newReport.children[4].children[1].children[0].children[1].id = `button-avistamiento-${reports.length}`
    console.log(newReport.children[4].children[1].children[0].children[1])

    reportsDiv.appendChild(newReport);
}