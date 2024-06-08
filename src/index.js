import express from 'express';
import { create } from 'express-handlebars';
import { ProductRouter } from './router/product.routes.js';
import { CarRouter } from './router/cars.routes.js';
import { viewsRouter } from './router/views.router.js';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import ProductManager from './controllers/ProductManager.js';

// Configuración de Handlebars
const app = express();
const hbs = create({ 
    extname: '.hbs',
    layoutsDir: './src/views/layouts',
    defaultLayout: 'main',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');

// Configuración de WebSocket
const server = http.createServer(app);
const io = new SocketIOServer(server);
app.set('io', io);  // Pasar la instancia de Socket.IO

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", ProductRouter);
app.use("/api/cars", CarRouter);
app.use("/", viewsRouter);  // Añadir el enrutador de vistas

// Configuración del WebSocket
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Emitir eventos cuando se agregan o eliminan productos
const productManager = new ProductManager();
productManager.on('productAdded', (product) => {
    io.emit('product-added', product);
});

productManager.on('productDeleted', (productId) => {
    io.emit('product-deleted', productId);
});

const port = 8081;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
