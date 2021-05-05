# CC5002-DesarrolloDeAppWeb
Repositorio del curso CC5002: Desarrollo de Aplicaciones Web

### Modelo de datos
![Modelo de datos](./enunciado/tarea2.png)

### Sitio de deploy: [anakena/~siaguile](https://anakena.dcc.uchile.cl/~siaguile/Tarea2/index.html)

### Despliegue local
```
python3 -m htt.server --bind localhost --cgi <port> 
```

### Base de datos local
Motor: MySQL
Database: tarea2
User: cc5002
password: programacionweb
Migración inicial:  

```
python3 migrations/0000_auto.py
```