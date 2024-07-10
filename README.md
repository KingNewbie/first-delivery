# PROYECTO CARRITO DE COMPRAS

> Este es un proyecto de ejemplo que implementa un carrito de compras utilizando Node.js, Express, MongoDB y WebSockets para la funcionalidad en tiempo real. El proyecto permite agregar productos a un carrito, actualizar cantidades, eliminar productos y ver el contenido del carrito. Además, cuenta con vistas para visualizar los productos en tiempo real y una API para gestionar productos y carritos.

# Contenido

  
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Vistas](#vistas)

## Instalación

- ### Clona el repositorio:
  - git clone https://github.com/KingNewbie/second-delivery.git
  - cd proyecto-carrito-compras ⏎ 

- ### Instala las dependencias:
  - npm install ⏎ 
- ### Inicia el servidor:
  - npm run dev ⏎

## Uso
> [!NOTE]
> El servidor se ejecutará en http://localhost:8081. Puedes interactuar con el API utilizando herramientas como Postman, Insomnia o cURL.
## Estructura del Proyecto

```
proyecto-carrito-compras/
│
├── src/
│   ├── controllers/
│   │   ├── cars.js
│   │   └── products.js
│   ├── data/
│   │   └── config.js
│   ├── models/
│   │   ├── cars.js
│   │   ├── messages.js
│   │   └── products.js
│   ├── router/
│   │   ├── cars.routes.js
│   │   ├── product.routes.js
│   │   └── views.router.js
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.hbs
│   │   ├── home.hbs
│   │   ├── index.hbs
│   │   └── realTimeProducts.hbs
│   └── index.js
│
├── assets/
│   └── styles.css
├── package.json
├── package-lock.json
└── README.md

```


## API Endpoints
### Carritos

    Crear un nuevo carrito
        Endpoint: POST /api/cars
        Descripción: Crea un nuevo carrito vacío.
        Respuesta:

        json

    {
      "message": "Car added successfully!"
    }

### Obtener todos los carritos

    Endpoint: GET /api/cars
    Descripción: Obtiene una lista de todos los carritos.
    Respuesta:

    json

    [
      {
        "id": "carId",
        "products": []
      }
    ]

### Obtener un carrito por ID

    Endpoint: GET /api/cars/:id
    Descripción: Obtiene un carrito específico por ID.
    Respuesta:

    json

    {
      "id": "carId",
      "products": []
    }

### Agregar un producto al carrito

    Endpoint: POST /api/cars/:cid/products/:pid
    Descripción: Agrega un producto al carrito con el ID cid y el producto con el ID pid.
    Respuesta:

    json

    {
      "message": "Product added to car successfully!"
    }

### Eliminar un producto del carrito

    Endpoint: DELETE /api/cars/:cid/products/:pid
    Descripción: Elimina un producto del carrito con el ID cid y el producto con el ID pid.
    Respuesta:

    json

    {
      "message": "Product removed from car successfully!"
    }

### Obtener productos de un carrito

    Endpoint: GET /api/cars/:cid/products
    Descripción: Obtiene todos los productos de un carrito específico.
    Respuesta:

    json

        [
          {
            "id": "productId",
            "cantidad": 1
          }
        ]

### Productos

    Obtener todos los productos
        Endpoint: GET /api/products
        Descripción: Obtiene una lista de todos los productos.
        Respuesta:

        json

    [
      {
        "id": "productId",
        "title": "Producto",
        "description": "Descripción",
        "code": "codigo",
        "price": 100,
        "status": true,
        "stock": 50,
        "category": "categoría",
        "thumbnails": ["image.jpg"]
      }
    ]

### Obtener un producto por ID

    Endpoint: GET /api/products/:id
    Descripción: Obtiene un producto específico por ID.
    Respuesta:

    json

    {
      "id": "productId",
      "title": "Producto",
      "description": "Descripción",
      "code": "codigo",
      "price": 100,
      "status": true,
      "stock": 50,
      "category": "categoría",
      "thumbnails": ["image.jpg"]
    }

### Crear un nuevo producto

    Endpoint: POST /api/products
    Descripción: Crea un nuevo producto.
    Respuesta:

    json
    {
      "message": "Product added successfully!"
    }
## Vistas

### Lista de Productos

    Ruta: GET /
    Descripción: Muestra una lista de todos los productos disponibles.

### Productos en Tiempo Real

    Ruta: GET /realtimeproducts
    Descripción: Muestra la lista de productos en tiempo real y permite agregar nuevos productos utilizando WebSockets.

### Ejemplo de Uso en el Navegador

    Navega a http://localhost:8081/ para ver la lista de productos.
    Navega a http://localhost:8081/realtimeproducts para ver y agregar productos en tiempo real.

### Configuración del WebSocket
  El proyecto utiliza Socket.IO para actualizar la lista de productos en tiempo real. El código relevante se encuentra en index.js y maneja las conexiones, así como los eventos de agregar y eliminar productos.

### Iniciar el Servidor

  Para iniciar el servidor, usa el siguiente comando:

  npm run dev

### Fase Final

Esta es la fase final del proyecto, donde todas las funcionalidades principales están implementadas y probadas. El proyecto incluye una API REST para gestionar productos y carritos, así como vistas dinámicas para visualizar y manipular los datos en tiempo real.