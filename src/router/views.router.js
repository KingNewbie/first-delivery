import { Router } from 'express';
import { getProducts } from '../controllers/products.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts(req, res);
        res.render('home', { title: 'Product List', products });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await getProducts(req, res);
        res.render('realTimeProducts', { title: 'Real-Time Product List', products });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

export { viewsRouter };
