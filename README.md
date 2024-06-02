# PROYECTO CARRITOS DE COMPRAS

> Este es un proyecto de ejemplo que implementa un carrito de compras utilizando Node.js, Express y archivos JSON para almacenar los datos. El proyecto permite agregar productos a un carrito, actualizar cantidades, eliminar productos y ver el contenido del carrito.

# Contenidos

  
- [Instalación](#Instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)

## Instalación

- ### Clona el repositorio:
  - git clone https://github.com/tu-usuario/proyecto-carrito-compras.git
cd proyecto-carrito-compras ⏎ 

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
│   │   └── CarManager.js
│   ├── models/
│   │   └── cars.json
│   ├── router/
│   │   ├── cars.routes.js
│   │   └── product.routes.js
│   └── index.js
│
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
