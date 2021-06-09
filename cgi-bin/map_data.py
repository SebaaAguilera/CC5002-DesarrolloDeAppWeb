#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json

# Local ./assets/
# Anakena ../assets/
coordinates = json.load(open('./assets/json/coordinates.json'))

def searchCoordinates(comuna):
    for element in coordinates:
        if element['name'] == comuna:
            return element

reportDB = db.ReportDB()
print("Content-type:application/json\r\n\r\n")
response = {
    'Result': [{
        'nombre': element[0],
        'cant': element[2],
        'coordinates': searchCoordinates(element[0]),
        'details': [ {
            'report_id': detail[4],
            'dia_hora': str(detail[1]),
            'tipo': detail[2],
            'estado': detail[3],
            'fotos': reportDB.get_photos(detail[0])
        } for detail in reportDB.get_report_detail_by_comuna(element[1])]
    } for element in reportDB.get_photos_per_comuna()],
}
print(json.JSONEncoder().encode(response))