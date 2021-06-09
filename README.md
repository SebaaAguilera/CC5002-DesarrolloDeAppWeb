# CC5002-DesarrolloDeAppWeb
Repositorio del curso CC5002: Desarrollo de Aplicaciones Web

### Modelo de datos
![Modelo de datos](./enunciado/tarea2.png)

### Sitio de deploy: [anakena/~siaguile](https://anakena.dcc.uchile.cl/~siaguile/index2.html)

### Despliegue local
Disclaimer: Los path's de de media y assets en save_report y map_data varían entre el despliegue local y anakena.

```
python3 -m http.server --bind localhost --cgi <port> 
```

### Conexión BDD
Motor: MySQL    
Database: cc500270_db    
User: cc500270_u    
Password: ibuspellen    

Migración inicial:  

```
mysql -u cc500270_u -p cc500270_db < sql/tarea2.sql
mysql -u cc500270_u -p cc500270_db < sql/region-comuna.sql
```