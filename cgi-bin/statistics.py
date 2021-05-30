#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
cgitb.enable()
import db
import json
import os

reportDB = db.ReportDB()

# Reports per day
reportsPerDay = reportDB.get_reports_per_day()
reportsPerDayAxis = {
    'label': [],
    'data': []
}
for element in reportsPerDay:
    reportsPerDayAxis['label'].append(str(element[0]))
    reportsPerDayAxis['data'].append(element[1])

# Reports by type
reportsByType = reportDB.get_reports_by_type()
reportsByTypeAxis = {
    'label': [],
    'data': []
}
for element in reportsByType:
    reportsByTypeAxis['label'].append(element[0])
    reportsByTypeAxis['data'].append(element[1])

# Reports by status
reportsByStatus = reportDB.get_reports_by_status()

reportsByStatusAxis = {
    'label': [],
    'data_vivo': [],
    'data_muerto': [],
    'data_desconocido': []
}
for element in reportsByStatus:
    reportsByStatusAxis['label'].append(str(element[0] % 100) + '-' + str(element[0] // 100))
    reportsByStatusAxis['data_vivo'].append(element[1])
    reportsByStatusAxis['data_muerto'].append(element[2])
    reportsByStatusAxis['data_desconocido'].append(element[3])

print("Content-type:application/json\r\n\r\n")
response = {
    'reportsPerDay': reportsPerDayAxis,
    'reportsByType': reportsByTypeAxis,
    'reportsByStatus': reportsByStatusAxis
}
print(json.JSONEncoder().encode(response))