# U8-web-service
Código fuente de la actividad "Diseño e implementación de un servicio web" perteneciente a la Unidad 8 del curso de Sistemas Distribuidos.

## Intregrantes
- Carolina Patiño
- Luis Fuentes
- David Monroy

## Requerimientos
- NodeJS (preferiblemente v12.19.0 o mayor)
- PostgreSQL

## Pasos para ejecutar el web services
1. Crear una base de datos en PostgreSQL y ejecutar los scripts de creación que se encuentran en ./bd/creates.sql
2. En la ruta base del proyecto, cree un archivo llamado _.env_ que tenga la misma estructura que el archivo _.sample.env_ (Cambie el nombre de este último archivo a _.env_)
3. Dentro del archivo _.env_, en cada campo inserte la siguiente información:
```
PORT=<PUERTO_DE_ESCUCHA_DEL _SERVER>
DBMS="postgres"
DB_NAME="<NOMBRE_DE_LA_BD_CREADA>"
DB_HOST="<HOST_DE_LA_BD_CREADA>"
DB_PORT=<PUERTO_DE_LA_BD_CREADA>
DB_USER="<USUARIO_DE_LA_BD_CREADA>"
DB_PASSWORD="<CONTRASEÑA_DEL_USUARIO>"
```
4. En la ruta base del proyecto, ejecute el siguiente comando para descargar las dependencias necesarias para el correcto funcionamiento del web service:
```
$ npm install
```
5. Con todos estos pasos realizados; ejecute el siguiente comando para comenzar la ejecución del web service:
```
$ npm run start
```
## Documentación del servicio
Una vez ejecutado el web service, puede acceder a la ruta http://localhost:{PORT}/api/v1/api-docs/ para encontrar la documentación del web service realizado
