#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os

reportDB = db.ReportDB()
REQUEST = os.environ['QUERY_STRING'].split('=')[1]

report = reportDB.get_report(REQUEST)
report_detail = reportDB.get_report_detail(REQUEST)

print("Content-type:text/html; charset=utf-8 \r\n\r\n")
print(f"""
<!DOCTYPE html>
<html>
<head>
<title>Detalles del avistamiento</title>
<meta charset="UTF-8">
<link rel="icon" type="image/svg" href="../assets/svg/buddy-30624.svg" sizes="any">
<link rel="stylesheet" href="../assets/css/styles.css">
<link rel="stylesheet" href="../assets/css/reportPage.css">
</head>
<body>
<nav>
    <ul>
        <li><a href="../index.html" class="home">AVISTAMIENTOS</a></li>
        <li><a href="../pages/form.html" class="redirect"> Informar avistamiento </a></li>
        <li><a href="../pages/reports.html" class="redirect"> Ver listado de avistamientos</a></li>
        <li><a href="../pages/statistics.html" class="redirect"> Estadísticas </a></li>
    </ul>
</nav>
<div class="card">
""")

if report is None:
    print("<h3>No hay información sobre este avistamiento</h3>")
else:
    print(f"""
    <h3>Datos de los avistamientos</h3>
    <div class="row">
        <div class="col-50">
            <p><b>Lugar</b></p>
            <ul>
                <li><b>Región: </b>{report[0]}</li>
                <li><b>Comuna: </b>{report[1]}</li>
                <li><b>Sector: </b>{report[2]}</li>
            </ul>
        </div>
        <div class="col-50">
            <p><b>Contacto</b></p>
            <ul>
                <li><b>Nombre contacto: </b>{report[3]}</li>
                <li><b>Email: </b>{report[4]}</li>
                <li><b>N° de celular: </b>{report[5]}</li>
            </ul>
        </div>        
    </div>
    """)

    for index, detail in enumerate(report_detail):
        fotos = reportDB.get_photos(detail[0])

        fotosHTML = ''
        for foto in fotos:
            fotosHTML += f'<div class="report-div-img"><img onclick="openInModal(this)" class="report-img" src="../{foto[1]+foto[2]}" alt="img"></div>'

        print(f"""
        <h3>Detalle de avistamiento n°{index + 1}</h3>
        <div>
        <p><b>Datos avistamiento</b></p>
        <ul>
            <li><b>Día y hora: </b>{detail[1]}</li>
            <li><b>Tipo: </b>{detail[2]}</li>
            <li><b>Estado: </b>{detail[3]}</li>
        </ul>
        </div>        
        <div class="image-list">
            {fotosHTML}
        </div>
        """)

print("""
    <div class="div-buttons">
        <div class="btn"><a href="../pages/reports.html"><b>Volver al listado</b></a></div>
        <div class="btn btn-white"><a href="../index.html"><b>Volver a la portada</b></a></div>
    </div>
</div>
<script src="../assets/js/modal_img.js"></script>
</body>
</html>
""")