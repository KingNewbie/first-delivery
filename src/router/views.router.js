import { Router } from 'express';
import { getProducts } from '../controllers/products.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const productsData = await getProducts(req, res, true);
        res.render('home', { title: 'Product List', products: productsData.payload });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const productsData = await getProducts(req, res, true);
        res.render('realTimeProducts', { title: 'Real-Time Product List', products: productsData.payload });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

viewsRouter.get('/addProductToCar', (req, res) => {
    res.render('addProductToCar', { title: 'Add Product to Car' });
});

export { viewsRouter };
