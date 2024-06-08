import express from 'express';
import { create } from 'express-handlebars';
import { ProductRouter } from './router/product.routes.js';
import { CarRouter } from './router/cars.routes.js';
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", ProductRouter);
app.use("/api/cars", CarRouter);

// Ruta para renderizar vistas
app.get('/', (req, res) => {
    res.render('index', { title: 'Product List' });
});

app.get('/realtimeproducts', async (req, res) => {
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { title: 'Real-Time Product List', products });
});

// Configuración del WebSocket
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = 8081;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
