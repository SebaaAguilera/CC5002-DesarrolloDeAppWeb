#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
import os

class ReportDB:
    def __init__(self):
        self.db = mysql.connector.connect(
            host = 'localhost',
            user = 'cc500270_u',
            password = 'ibuspellen',
            database= 'cc500270_db'
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
        sql = '''
            SELECT AV.id, AV.dia_hora, CO.nombre, AV.sector, AV.nombre, J.count_DA, J.count_F 
            FROM avistamiento AV, comuna CO,
                (
                    SELECT AV.id AS id, COUNT(DA.id) AS count_DA, COUNT(F.id) AS count_F
                    FROM avistamiento AV, detalle_avistamiento DA, foto F
                    WHERE AV.id = DA.avistamiento_id AND DA.id = F.detalle_avistamiento_id
                    GROUP BY (AV.id)
                ) J
            WHERE AV.id = J.id AND AV.comuna_id = CO.id;
        '''
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_last_reports(self):
        sql = '''
            SELECT DA.dia_hora, CO.nombre, AV.sector, DA.tipo, F.ruta_archivo, F.nombre_archivo
            FROM avistamiento AV, detalle_avistamiento DA, comuna CO,
                (
                    SELECT DA.id AS id, F.ruta_archivo AS ruta_archivo, MAX(F.nombre_archivo) as nombre_archivo
                    FROM foto F, detalle_avistamiento DA 
                    WHERE F.detalle_avistamiento_id = DA.id 
                    GROUP BY DA.id, F.ruta_archivo
                ) F
            WHERE DA.avistamiento_id = AV.id AND AV.comuna_id=CO.id AND F.id = DA.id
            ORDER BY DA.dia_hora DESC LIMIT 5;
        '''
        self.cursor.execute(sql)
        return  self.cursor.fetchall()

    def get_report(self, report_id):
        sql = ''' 
            SELECT RE.nombre, CO.nombre, AV.sector, AV.nombre, AV.email, AV.celular
            FROM region RE, comuna CO, avistamiento AV
            WHERE CO.region_id = RE.id AND AV.comuna_id = CO.id AND AV.id = %s;
        '''
        self.cursor.execute(sql, (report_id, ))
        return self.cursor.fetchone()
    
    def get_report_detail(self, report_id):
        self.cursor.execute('SELECT id, dia_hora, tipo, estado, avistamiento_id FROM detalle_avistamiento WHERE avistamiento_id=%s', (report_id, ))
        return self.cursor.fetchall()     

    def get_photos(self,report_detail_id):
        self.cursor.execute('SELECT id, ruta_archivo, nombre_archivo, detalle_avistamiento_id FROM foto WHERE detalle_avistamiento_id=%s', (report_detail_id, ))
        return self.cursor.fetchall()

    def get_regiones(self):
        self.cursor.execute('SELECT region.id, nombre FROM region ORDER BY nombre ASC')
        return self.cursor.fetchall()

    def get_comunas(self, regions_id):
        self.cursor.execute('SELECT id, nombre FROM comuna WHERE region_id=%s ORDER BY nombre ASC;', (regions_id, ))
        return self.cursor.fetchall()

    def get_photos_per_comuna(self):
        sql = '''
            SELECT C.nombre, COUNT(F.id)
            FROM comuna C, avistamiento A, detalle_avistamiento D, foto F
            WHERE C.id = A.comuna_id AND A.id = D.avistamiento_id AND D.id = F.detalle_avistamiento_id
            GROUP BY C.nombre
        '''
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_reports_per_day(self):
        sql = '''
            SELECT CAST(dia_hora AS DATE) AS dia , COUNT(dia_hora) 
            FROM detalle_avistamiento 
            GROUP BY dia
            ORDER BY dia ASC
            '''
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_reports_by_type(self):
        sql = '''
            SELECT tipo , COUNT(tipo) 
            FROM detalle_avistamiento 
            GROUP BY tipo
            '''
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_reports_by_status(self):
        sql = '''
            SELECT D.mes, COALESCE(V.cant, 0), COALESCE(M.cant, 0), COALESCE(N.cant, 0)
            FROM (
                SELECT DISTINCT EXTRACT(YEAR_MONTH FROM dia_hora) AS mes 
                FROM detalle_avistamiento
            ) D LEFT OUTER JOIN (
                SELECT EXTRACT(YEAR_MONTH FROM dia_hora) AS mes, estado , COUNT(estado) AS cant
                FROM detalle_avistamiento 
                WHERE estado = 'vivo'
                GROUP BY mes, estado
            ) V
            ON D.mes = V.mes
            LEFT OUTER JOIN (
                SELECT EXTRACT(YEAR_MONTH FROM dia_hora) AS mes, estado , COUNT(estado) AS cant
                FROM detalle_avistamiento 
                WHERE estado = 'muerto'
                GROUP BY mes, estado
            ) M
            ON D.mes = M.mes
            LEFT OUTER JOIN (
                SELECT EXTRACT(YEAR_MONTH FROM dia_hora) AS mes, estado , COUNT(estado) AS cant
                FROM detalle_avistamiento 
                WHERE estado = 'no sé'
                GROUP BY mes, estado
            ) N
            ON D.mes = N.mes
            ORDER BY D.mes ASC
        '''
        self.cursor.execute(sql)
        return self.cursor.fetchall()