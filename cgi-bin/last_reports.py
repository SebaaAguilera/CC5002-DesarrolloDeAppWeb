#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os

reportDB = db.ReportDB()
print("Content-type:application/json\r\n\r\n")
response = {
    'Result': [{
        'fecha': str(element[0]),
        'comuna': element[1], 
        'sector': element[2],
        'tipo': element[3],
        'foto': element[4][0] + element[4][1] 
        } for element in reportDB.get_last_reports()]
}
print(json.JSONEncoder().encode(response))