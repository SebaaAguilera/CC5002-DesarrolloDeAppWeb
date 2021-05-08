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
            ruta_media
            comuna_id,
            sector,
            nombre,
            email,
            celular,
            reports: [
                {
                    dia_hora
                    tipo,
                    estado
                    fotos: [
                        filename1,
                        ...
                    ]
                },
                ...
            ]            
        }
        """

        for report in data['reports']:
            reportId = self.save_report((
                data['comuna_id'],
                report['dia_hora'],
                data['sector'],
                data['nombre'],
                data['email'],
                data['celular']
            ))
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
        self.cursor.execute('SELECT DA.dia_hora, CO.nombre, AV.sector, DA.tipo FROM avistamiento AV, detalle_avistamiento DA, comuna CO WHERE DA.avistamiento_id = AV.id AND AV.comuna_id=CO.id ORDER BY DA.dia_hora DESC LIMIT 5')
        return self.cursor.fetchall()

    def get_report_detail(self, report_id):
        self.cursor.execute('SELECT id, dia_hora, tipo, estado, avistamiento_id FROM detalle_avistamiento WHERE avistamiento_id=%s', report_id)
        return self.cursor.fetchall()

    def get_photos(self,report_detail_id):
        self.cursor.execute('SELECT id, ruta_archivo, nombre_archivo, detalle_avistamiento_id FROM foto WHERE detalle_avistamiento_id=%s', report_detail_id)
        return self.cursor.fetchall()

    def get_regiones(self):
        self.cursor.execute('SELECT region.id, nombre FROM region ORDER BY nombre ASC')
        return self.cursor.fetchall()

    def get_comunas(self, regions_id):
        self.cursor.execute(f'SELECT id, nombre FROM comuna WHERE region_id={regions_id} ORDER BY nombre ASC;')
        return self.cursor.fetchall()

