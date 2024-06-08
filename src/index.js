import express from 'express';
import { create } from 'express-handlebars';
import { ProductRouter } from './router/product.routes.js';
import { CarRouter } from './router/cars.routes.js';
import { Server as SocketServer } from 'socket.io';
import http from 'http';

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products",ProductRouter);
app.use("/api/cars",CarRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
