# Estructura del Servidor

### El servidor debe estar correctamente estructurado para manejar las funcionalidades del comercio online. Se debe utilizar el motor de plantillas Handlebars para desarrollar las vistas.

#### Vistas con Handlebars

1. localhost:8080: Muestra la página de inicio del comercio, que debe incluir como mínimo el logo del comercio y la lista de todos los productos que se venden.

2. localhost:8080/real: Muestra la página con todos los productos y debe actualizarse en tiempo real utilizando Handlebars y sockets.

3. localhost:8080/form: Muestra la página con un formulario en tiempo real para crear un nuevo producto utilizando Handlebars y sockets.

4. localhost:8080/register: Muestra la página con un formulario para registrar un usuario. No es necesario implementar funcionalidades de fetch, solo utilizar Handlebars.

#### Sockets
##### Se debe implementa un servidor TCP con sockets para la comunicación en tiempo real entre el back y el front. 

