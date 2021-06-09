#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db2
import json
import os

reportDB = db2.ReportDB()
regions = []
for region in reportDB.get_regiones():
    communes = reportDB.get_comunas(region[0])
    regions.append({
        'number': region[0],
        'name': region[1],
        'communes': [ {'number': comuna[0],'name': comuna[1]} for comuna in communes]
    })
print("Content-type:application/json\r\n\r\n")
response = {
    'Result': regions
}
print(json.JSONEncoder().encode(response))