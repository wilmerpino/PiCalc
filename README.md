# PiCalc
Calcular los decimales del pi considerando el número random: Recibe un parámetro de entrada que calcula un número random entre (parametro/2 y el
parametro). Luego deberás calcular los decimales del pi considerando el número random.

Para instalar ejecute:
> npm install

> npm run dev

La aplicación se corre en el puerto 300
> http://localhost:3000

Los EndPoint son los siguientes:
**Autenticación**
> POST: http://localhost:3000/login

INPUT
````
{
  "login": "santiago",
  "password": "password"
}
````

OUTPUT
````
{
"success": true,
"message": "Usuario autenticado",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzYW50aWFnbyIsImlhdCI6MTYyNzE1MTkzOCwiZXhwIjoxNjI3MTg0MzM4fQ.QwsthghWjQ4pYDn0f-DvgcmhmG3TZl4MM6iLl-LCxxI"
}
````

**Uso del método PI para calcular la cantidad de decimales**
> GET: http://localhost:3000/pi

Añadir el Header al llamado:
> auth: 'token recibido en el endopoint Login'

Ejemplo:
````
auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzYW50aWFnbyIsImlhdCI6MTYyNzE1MTkzOCwiZXhwIjoxNjI3MTg0MzM4fQ.QwsthghWjQ4pYDn0f-DvgcmhmG3TZl4MM6iLl-LCxxI'
````

INPUT
> /pi?random_limit=12

OUTPUT
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

Sólo se permiten números
````
{
"success": false,
"message": "Debe ingresar un número entero ente 0 y 100"
}
````

Solo se permiten números entre 0 y 100
````
{
"success": false,
"message": "El random limit debe ser mayor >= 0  y <= 100"
}
````

## Pruebas unitarias
Se difinen 5 pruebas
1. POST Login
   - Usuario o Contraseña no validos
   - Autenticado

2. GET PI 
   - No autenticado
   - Parametro no válido
   - Valor correcto
   
Para ejecutar las pruebas ejecute
> npm run test

## Tecnogías utilizadas

- [x] Node.js
- [x] Typescript
- [x] Express
- [x] Cors
- [x] JWT
- [x] Mocha
- [x] Chai   


