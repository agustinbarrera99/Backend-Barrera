## Servidor Express con Operaciones CRUD
Este proyecto es una implementación de un servidor Express que proporciona operaciones CRUD para tres recursos: productos, usuarios y pedidos. El servidor admite varios mecanismos de almacenamiento de datos, incluyendo en memoria, sistema de archivos y MongoDB. Además, incorpora middlewares esenciales y manejo de errores.

## Endpoints de la API

### Productos

Crear Producto:

POST /api/products
Cuerpo: Datos JSON para el nuevo producto
Obtener Todos los Productos:

GET /api/products
Obtener un Producto:

GET /api/products/:pid
Parámetros: pid - ID del producto
Actualizar Producto:

PUT /api/products/:pid
Parámetros: pid - ID del producto
Cuerpo: Datos JSON actualizados para el producto
Eliminar Producto:

DELETE /api/products/:pid
Parámetros: pid - ID del producto

### Usuarios
Crear Usuario:

POST /api/users
Cuerpo: Datos JSON para el nuevo usuario
Obtener Todos los Usuarios:

GET /api/users
Obtener un Usuario:

GET /api/users/:uid
Parámetros: uid - ID del usuario
Obtener Usuario por Email:

GET /api/users/email/:email
Parámetros: email - Correo electrónico del usuario
Actualizar Usuario:

PUT /api/users/:uid
Parámetros: uid - ID del usuario
Cuerpo: Datos JSON actualizados para el usuario
Eliminar Usuario:

DELETE /api/users/:uid
Parámetros: uid - ID del usuario

### Orders
Crear Pedido:

POST /api/orders
Cuerpo: Datos JSON para el nuevo pedido
Obtener Todos los Pedidos:

GET /api/orders
Obtener un Pedido:

GET /api/orders/:oid
Parámetros: oid - ID del pedido
Actualizar Pedido:

PUT /api/orders/:oid
Parámetros: oid - ID del pedido
Cuerpo: Datos JSON actualizados para el pedido
Eliminar Pedido:

DELETE /api/orders/:oid
Parámetros: oid - ID del pedido



