import express from 'express';
import { ProductRouter } from './router/product.routes.js';
import { CarRouter } from './router/cars.routes.js';


const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products",ProductRouter);
app.use("/api/cars",CarRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
