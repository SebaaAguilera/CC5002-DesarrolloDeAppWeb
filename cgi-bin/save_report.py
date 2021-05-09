#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import json
import html
import os
import datetime as dt
import hashlib as hl
import filetype

import db

MEDIAPATH = 'media/'
MEDIAERROR = False
MEDIALENERROR = False

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
        for foto in report['fotos']:
            os.remove(MEDIAPATH + foto)

print("Content-type:text/html; charset=utf-8 \r\n\r\n")
print("""
<!DOCTYPE html>
<html>
<head>
<title>Guardado de avistamiento</title>
<meta charset="UTF-8">
<link rel="icon" type="image/svg" href="../assets/svg/buddy-30624.svg" sizes="any">
<link rel="stylesheet" href="../assets/css/styles.css">
<link rel="stylesheet" href="../assets/css/form.css">
</head>
<body>
""")
#print("<button onclick='window.history.back();'>Go Back</button>")

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

    reports.append({
        'dia_hora': fieldDiaHora.value,
        'tipo': fieldTipo.value,
        'estado': fieldEstado.value,
        'fotos': fotos
    })

    if MEDIAERROR:
        delete_media(reports)
        break
    elif len(fotos) == 0 or len(fotos) > 5:
        MEDIALENERROR = True
        delete_media(reports)
        break

### BODY
print('<div class="card" style="margin-top: 50px">')

if MEDIAERROR:
    print('<h3>Fotos no cumplen con el formato</h3>')
    print(''''
    <div class="form-button">
        <button class="btn" onclick="window.history.back();"><b>Volver al formulario</b></button>
    </div>
    ''')
elif MEDIALENERROR:
    print('<h3>Deben ser entre 1 y 5 fotos</h3>')
    print(''''
    <div class="form-button">
        <button class="btn" onclick="window.history.back();"><b>Volver al formulario</b></button>
    </div>
    ''')
else:
    try:
        print('<h3>¡Hemos recibido su información, muchas gracias por colaborar!</h3>')
        reportDB.save_data({
            'ruta_media': 'media/',
            'insertion': str(dt.datetime.now()),
            'comuna_id': html.escape(fieldComuna.value),
            'sector': html.escape(fieldSector.value),
            'nombre': html.escape(fieldNombre.value),
            'email': html.escape(fieldEmail.value),
            'celular': html.escape(fieldFono.value),
            'reports': reports
        })
        print('''
        <div class="form-button">
            <div class="btn"><a href="../index.html"><b>Volver a la portada</b></a></div>
        </div>
        ''')
    except Exception as error:
        delete_media(reports)
        print('<h3>Oh no! Sus datos no han podido ser guardados</h3>')
        print(''''
        <div class="form-button">
            <button class="btn" onclick="window.history.back();"><b>Volver al formulario</b></button>
        </div>
        ''')
        #print(error)
    
print("""
</div>
</body>
</html>
""")