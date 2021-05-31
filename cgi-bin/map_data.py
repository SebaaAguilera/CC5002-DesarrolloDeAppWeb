#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json

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
        'cant': element[1],
        'coordinates': searchCoordinates(element[0])
    } for element in reportDB.get_photos_per_comuna()],
}
print(json.JSONEncoder().encode(response))