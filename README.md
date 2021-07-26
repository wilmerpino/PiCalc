# PiCalc
Calcular los decimales del pi considerando el número random: Recibe un parámetro de entrada que calcula un número random entre (parametro/2 y el
parametro). Luego deberás calcular los decimales del pi considerando el número random.

## Instalación ##
**Descargue el proyecto desde el repositorio*
> git clone https://github.com/wilmerpino/PiCalc.git

**Moverse a la carpeta PiCalc**
> cd PiCalc

**Descargar las dependencias con npm**
> npm install

**Ejecutar la aplicación en modo de desarrollo**
> npm run dev

**Nota: Debe tener instalado `node` y `npm`**

## La aplicación se corre en el puerto 300
> http://localhost:3000

## Carpetas y archivos del proyecto
- documentacion
  - jMeter  
- src
  - config.ts
  - controller.ts
  - index.ts
  - middleware.ts
  - routes.ts
- tests
  - login.expect.ts
  - pi.expect.ts
- .env

## Se implementan los siguientes EndPoint ##
**Autenticación**
Para agregar seguridad al sitio se define un EndPoint que devuelve un Token que deberá utilizarse en cada petición a la API

> POST: http://localhost:3000/api/login

**INPUT**
Debe proporcionar las siguientes credenciales
````
{
  "login": "santiago",
  "password": "password"
}
````

**OUTPUT**
Copiar el Token el cuál utilizará en la peticiones a la API de PI
````
{
"success": true,
"message": "Usuario autenticado",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzYW50aWFnbyIsImlhdCI6MTYyNzE1MTkzOCwiZXhwIjoxNjI3MTg0MzM4fQ.QwsthghWjQ4pYDn0f-DvgcmhmG3TZl4MM6iLl-LCxxI"
}
````

## Uso del método PI para calcular la cantidad de decimales
> GET: http://localhost:3000/api/pi

Añadir el Header al llamado el Token recibido:
> auth: 'token recibido en el endopoint Login'

## Ejemplo:
````
auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzYW50aWFnbyIsImlhdCI6MTYyNzE1MTkzOCwiZXhwIjoxNjI3MTg0MzM4fQ.QwsthghWjQ4pYDn0f-DvgcmhmG3TZl4MM6iLl-LCxxI'
````

**INPUT**
> /api/pi?random_limit=12

**OUTPUT**
````
{
  "random": 7,
  "random_limit": 12,
  "pi": "3.1415927"
}
````

## Posibles Errores:

**No autorizado**
No se recibió el token o no es válido
````
{
  "message": "No Autorizado"
}
````

**Parámetro no válido**
Debe recibirse el parámetro _random_limit_ por la URL
````
{
"success": false,
"message": "No se recibió el parámetro ramdom_limit"
}
````

**Sólo se permiten números**
````
{
"success": false,
"message": "Debe ingresar un número entero ente 0 y 48"
}
````

**Solo se permiten números entre 0 y 48**
````
{
"success": false,
"message": "El random limit debe ser mayor >= 0  y <= 48"
}
````
**Se realizan pruebas con las librería Math.PI de javascript, la cuál devuelve un máximo de 48 decimales**

## Pruebas unitarias
Se difinen 5 pruebas

**1. POST Login**
   - Usuario o Contraseña no validos
   - Autenticado

**2. GET PI**
   - No autenticado
   - Parametro no válido
   - Valor correcto
   
**Para ejecutar las pruebas ejecute**
> npm run test

## Contenedor ##
Se agrega archivo `Dockerfile` con la configuración de Docker para virtualizar el aplicativo

Siga las siguientes instruccones para generar el _Contenedor Docker_

Desde la carpta `PiCalc` ejecute la siguente secuencia de comandos

Constuir la imagen
> docker build -t yapopi:0.0.1 . --no-cache=true

Verificar la imagen creada
> docker image ls

Montar la imagen en un contededor Docker
> docker container run -it -d -p 3000:3000 yapopi:0.0.1

Varificar que el contenedor este ejectándose
> docker container ls

**La aplicación queda ejecutándose en la URL http://localhost:300**

## Documentación adicional ##
La carpeta `documentacion` contiene información de pruebas adicionales

**Postman Collection**
Se agrega collection de Postman en `documentacion/YapoPI.postman_collection.json` con la configuración de los EndPoint (recuerde actualizar el Token de seguridad)

**Apache jMeter**
Se realizan pruebas de carga con [Apache jMeter](https://jmeter.apache.org/), los resultados de las pruebas están en `documentacion/jMetter/HTMLReports/index.html`

## Tecnogías utilizadas

- [x] Node.js
- [x] Typescript
- [x] Express
- [x] Cors
- [x] JWT
- [x] Mocha
- [x] Chai 
- [x] Docker
- [x] Apache jMeter  

# Autor #
Wilmer Pino

wilmerpino@gmail.com

https://www.linkedin.com/in/wilmerpino/



