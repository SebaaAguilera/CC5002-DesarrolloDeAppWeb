#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os

reportDB = db.ReportDB()
REQUEST = os.environ['QUERY_STRING'].split('&')[0]


print("Content-type:text/html; charset=utf-8 \r\n\r\n")
print(f"""
<!DOCTYPE html>
    <html>
    <head>
    <title>Guardado de avistamiento</title>
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
        <h3>Avistamiento de arácnido</h3>
        {
            REQUEST
        }
        <div class="report">
            <div class="row">
                <div class="col-25 report-data">
                    <ul>
                        <li><b>Fecha hora: </b>2021-02-28 22:04</li>
                        <li><b>Región: </b> Región Metropolitana</li>
                        <li><b>Comuna: </b> Providencia</li>
                        <li><b>Sector: </b>Plaza Italia</li>
                        <li><b>Nombre contacto: </b>Paz Odalis</li>
                        <li><b>Email: </b>odalis@mail.cl</li>
                        <li><b>N° de celular: </b>+569********</li>
                        <li><b>Tipo: </b>arácnido</li>
                        <li><b>Estado: </b>vivo</li>
                    </ul>
                </div>
            <div class="col-75 image-list">
                <div class="report-div-img"><img onclick="openInModal(this)" class="report-img" src="https://bugwoodcloud.org/images/384x256/5501304.jpg" alt="tarantula"></div>
                <div class="report-div-img"><img onclick="openInModal(this)" class="report-img" src="https://bugwoodcloud.org/images/384x256/5501306.jpg" alt="tarantula"></div>
                <div class="report-div-img"><img onclick="openInModal(this)" class="report-img" src="https://bugwoodcloud.org/images/384x256/5501307.jpg" alt="tarantula"></div>
            </div>
        </div>
    </div>
    <div class="div-buttons">
        <div class="btn"><a href="../pages/reports.html"><b>Volver al listado</b></a></div>
        <div class="btn btn-white"><a href="../index.html"><b>Volver a la portada</b></a></div>
    </div>
</div>
<script src="../assets/js/modal_img.js"></script>
</body>
</html>
""")