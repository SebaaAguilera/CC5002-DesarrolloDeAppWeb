#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os
import datetime
import hashlib
import filetype

reportDB = db.ReportDB()
form = cgi.FieldStorage()

def cantidadAvistamientos():
    cant = 0
    error = False
    while not error:
        try:
            form [f'dia-hora-avistamiento-{cant}']
            cant += 1
        except:
            error = True
    return cant

print("Content-type:text/html\r\n\r\n")
print("""
<!DOCTYPE html>
    <html>
    <head>
    <title>Save doctor</title>
    </head>
    <body>
""")
print("<button onclick='window.history.back();'>Go Back</button>")

# Lugar
fieldComuna = form['comuna']
fieldSector = form['sector']
print('<b>Lugar</b><br>')
print(fieldComuna,'<br>')
print(fieldSector,'<br>')
# Contacto
fieldNombre = form['nombre']
fieldEmail = form['email']
fieldFono = form ['celular']
print('<b>Contacto</b><br>')
print(fieldNombre,'<br>')
print(fieldEmail,'<br>')
print(fieldFono,'<br>')

# Avistamientos
print('<b>Avistamientos</b><br>')

index = 0
reports = []
while index < cantidadAvistamientos():
    fieldDiaHora = form [f'dia-hora-avistamiento-{index}']
    fieldTipo = form [f'tipo-avistamiento-{index}']
    fieldEstado = form [f'estado-avistamiento-{index}']
    fieldFoto = form [f'foto-avistamiento-{index}']

    if isinstance(fieldFoto, list):
        for foto in fieldFoto:
            print(index, foto,'<br>')
    else:
        print(index, fieldFoto,'<br>')
    index += 1



# reportDB.save_data({
#     'ruta_media': 'media/',
#     'comuna_id': fieldComuna.value,
#     'sector': fieldSector.value,
#     'nombre': fieldNombre.value,
#     'email': fieldEmail.value,
#     'celular': fieldFono.value,
#     'reports': []
# })

print("""
</body>
</html>
""")