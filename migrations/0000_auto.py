#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector


# FIX ME no está funcionando :c
class Migration:
    def __init__(self):
        self.db = mysql.connector.connect(
            host = 'localhost',
            user = 'cc5002',
            password = 'programacionweb',
            database= 'tarea2',
        )
        self.cursor = self.db.cursor()

migration = Migration()

migration.cursor.execute(open('./sql/tarea2.sql','r'), multi=True)
migration.cursor.execute(open('./sql/region_comuna.sql','r'), multi=True)

