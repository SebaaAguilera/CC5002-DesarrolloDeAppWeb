#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db2
import json
import os

reportDB = db2.ReportDB()
print("Content-type:application/json\r\n\r\n")
response = {
    'Result': [{
        'avistamiento_id': element[0],
        'fecha': str(element[1]),
        'comuna': element[2],
        'sector': element[3],
        'contacto': element[4],
        'total_avistamientos': element[5],
        'total_fotos': element[6]
    } for element in reportDB.get_reports()]
}
print(json.JSONEncoder().encode(response))