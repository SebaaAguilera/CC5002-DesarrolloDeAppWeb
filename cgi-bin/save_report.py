#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os
import datetime as dt
import hashlib as hl
import filetype

MEDIAPATH = 'media/'
MEDIAERROR = False

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

def save_media(field):
    datetime = str(dt.datetime.now())
    filename = datetime + os.path.basename(field.filename)
    filename = hl.sha256(filename.encode()).hexdigest()[0:30]
    file_path = MEDIAPATH + filename
    open(file_path, 'wb').write(field.file.read())

    tipo = filetype.guess(file_path)
    if tipo.mime[0:5] != 'image':
        os.remove(file_path)
        raise Exception('Archivo no es una imagen')
    else:
        return filename

def delete_media(reports):
    for report in reports:
        for foto in fotos:
            os.remove(MEDIAPATH + foto)

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

# Contacto
fieldNombre = form['nombre']
fieldEmail = form['email']
fieldFono = form ['celular']

# Avistamientos
index = 0
reports = []
for index in range(0,cantidadAvistamientos()):
    fieldDiaHora = form [f'dia-hora-avistamiento-{index}']
    fieldTipo = form [f'tipo-avistamiento-{index}']
    fieldEstado = form [f'estado-avistamiento-{index}']
    fieldFoto = form [f'foto-avistamiento-{index}']

    fotos = []
    # Que horrendoo esto
    if isinstance(fieldFoto, list):
        for foto in fieldFoto:
            if foto.filename:
                try:
                    filename = save_media(foto)
                    fotos.append(filename)
                except:
                    MEDIAERROR =  True
    else:
        if fieldFoto.filename:
            try:
                filename = save_media(fieldFoto)
                fotos.append(filename)
            except:
                MEDIAERROR =  True

    if MEDIAERROR:
        delete_media(reports)
        break

    reports.append({
        'dia_hora': fieldDiaHora.value,
        'tipo': fieldTipo.value,
        'estado': fieldEstado.value,
        'fotos': fotos
    })

if MEDIAERROR:
    print('<h3>Fotos no cumplen con el formato</h3>')
else:
    try:
        print('<h3>Se van a guardar las cosas</h3>')
        print({
            'ruta_media': 'media/',
            'comuna_id': fieldComuna.value,
            'sector': fieldSector.value,
            'nombre': fieldNombre.value,
            'email': fieldEmail.value,
            'celular': fieldFono.value,
            'reports': reports
        })
        # reportDB.save_data({
        #     'ruta_media': 'media/',
        #     'comuna_id': fieldComuna.value,
        #     'sector': fieldSector.value,
        #     'nombre': fieldNombre.value,
        #     'email': fieldEmail.value,
        #     'celular': fieldFono.value,
        #     'reports': reports
        # })
    except:
        delete_media(reports)
        print('<h3>Oh no!</h3>')


print("""
</body>
</html>
""")