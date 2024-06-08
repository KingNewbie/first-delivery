import { Router } from 'express';
import ProductManager from '../controllers/ProductManager.js';

const viewsRouter = Router();
const productManager = new ProductManager();

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { title: 'Product List', products });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { title: 'Real-Time Product List', products });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

export { viewsRouter };
