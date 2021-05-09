#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
import os

class ReportDB:
    def __init__(self):
        self.db = mysql.connector.connect(
            host = 'localhost',
            user = 'cc5002',
            password = 'programacionweb',
            database= 'tarea2'
        )
        self.cursor = self.db.cursor()

    # Save in database

    def save_data(self, data):
        """D
        Data should be formatted like: {
            ruta_media, insertion
            comuna_id, sector,
            nombre, email, celular,
            reports: [
                {
                    dia_hora, tipo, estado,
                    fotos: [filename1, ...]
                }, ...
            ]            
        }
        """
        reportId = self.save_report((
                data['comuna_id'],
                data['insertion'],
                data['sector'],
                data['nombre'],
                data['email'],
                data['celular']
            ))
        for report in data['reports']:
            reportDetailId = self.save_report_detail((
                report['dia_hora'],
                report['tipo'],
                report['estado'],
                reportId
            ))
            for foto in report['fotos']:
                self.save_photo((
                    data['ruta_media'],
                    foto,
                    reportDetailId
                ))

    def save_report(self, data):
        sql = '''
            INSERT INTO avistamiento (comuna_id, dia_hora, sector, nombre, email, celular) 
            VALUES (%s, %s, %s, %s, %s, %s)
        '''
        self.cursor.execute(sql, data)
        self.db.commit()
        return self.cursor.getlastrowid()

    def save_report_detail(self, data):
        sql = '''
            INSERT INTO detalle_avistamiento (dia_hora, tipo, estado, avistamiento_id) 
            VALUES (%s, %s, %s, %s);
        '''
        self.cursor.execute(sql, data)
        self.db.commit()
        return self.cursor.getlastrowid()

    def save_photo(self, data):
        sql = '''
            INSERT INTO foto (ruta_archivo, nombre_archivo, detalle_avistamiento_id) 
            VALUES (%s, %s, %s);
        '''
        self.cursor.execute(sql, data)
        self.db.commit()

    # Get fron database
    def get_reports(self):
        self.cursor.execute('SELECT id, comuna_id, dia_hora, sector, nombre, email, celular FROM avistamiento')
        return self.cursor.fetchall()

    def get_last_reports(self):
        self.cursor.execute('SELECT DA.dia_hora, CO.nombre, AV.sector, DA.tipo, DA.id FROM avistamiento AV, detalle_avistamiento DA, comuna CO WHERE DA.avistamiento_id = AV.id AND AV.comuna_id=CO.id ORDER BY DA.dia_hora DESC LIMIT 5')
        reports = self.cursor.fetchall()
        return [ [element[0], element[1], element[2], element[3], self.get_first_photo(element[4])] for element in reports]

    def get_report_detail(self, report_id):
        self.cursor.execute('SELECT id, dia_hora, tipo, estado, avistamiento_id FROM detalle_avistamiento WHERE avistamiento_id=%s', report_id)
        return self.cursor.fetchall()

    def get_first_photo(self,report_detail_id):
        self.cursor.execute(f'SELECT ruta_archivo, nombre_archivo FROM foto WHERE detalle_avistamiento_id={report_detail_id} LIMIT 1')
        return self.cursor.fetchone()        

    def get_photos(self,report_detail_id):
        self.cursor.execute('SELECT id, ruta_archivo, nombre_archivo, detalle_avistamiento_id FROM foto WHERE detalle_avistamiento_id=%s', report_detail_id)
        return self.cursor.fetchall()

    def get_regiones(self):
        self.cursor.execute('SELECT region.id, nombre FROM region ORDER BY nombre ASC')
        return self.cursor.fetchall()

    def get_comunas(self, regions_id):
        self.cursor.execute(f'SELECT id, nombre FROM comuna WHERE region_id={regions_id} ORDER BY nombre ASC;')
        return self.cursor.fetchall()

