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
    'Result': db.get_reports()
}
print(json.JSONEncoder().encode(response))