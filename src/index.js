import express from 'express';
import { create } from 'express-handlebars';
import { ProductRouter } from './router/product.routes.js';
import { CarRouter } from './router/cars.routes.js';
import { viewsRouter } from './router/views.router.js';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { connectDB } from './data/config.js';
import { productModel } from './models/products.js'; // Importar el modelo de productos
import { CarModel } from './models/cars.js'; // Importar el modelo de carros
import mongoose from 'mongoose'; // Importar mongoose para validar ObjectId

// Configuración de Handlebars
const app = express();
const hbs = create({
    extname: '.hbs',
    layoutsDir: './src/views/layouts',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');

// Configuración de archivos estáticos
app.use(express.static('assets'));

// Configuración de WebSocket
const server = http.createServer(app);
const io = new SocketIOServer(server);
app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", ProductRouter);
app.use("/api/cars", CarRouter);
app.use("/", viewsRouter);

// Conectar a la base de datos
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
})();

// Configuración del WebSocket
io.on('connection', async (socket) => {
    console.log('New client connected');
    const products = await productModel.find();
    socket.emit('products', products);

    socket.on('add-product', async (product) => {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            io.emit('product-added', newProduct);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    socket.on('delete-product', async (productId) => {
        try {
            await productModel.findByIdAndDelete(productId);
            io.emit('product-deleted', productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });

    socket.on('add-product-to-car', async ({ carId, productId }) => {
        try {
            if (!mongoose.isValidObjectId(carId) || !mongoose.isValidObjectId(productId)) {
                socket.emit('product-added-to-car', 'Invalid car ID or product ID');
                return;
            }
            const car = await CarModel.findById(carId);
            if (!car) {
                socket.emit('product-added-to-car', 'Car not found');
                return;
            }
            const product = car.products.find(p => p.id.toString() === productId);
            if (product) {
                product.quantity++;
            } else {
                car.products.push({ id: productId, quantity: 1 });
            }
            await car.save();
            socket.emit('product-added-to-car', 'Product added to car successfully');
        } catch (error) {
            console.error('Error adding product to car:', error);
            socket.emit('product-added-to-car', 'Unable to add product to car');
        }
    });
});

// Iniciar el servidor
const port = 8081;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
