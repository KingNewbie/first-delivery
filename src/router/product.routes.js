import { Router } from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager();
const ProductRouter = Router();

ProductRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('index', { title: 'Product List', products });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

ProductRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productManager.getProductById(id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch product' });
    }
});

ProductRouter.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const message = await productManager.writeProducts(newProduct);
        req.app.get('io').emit('product-added', newProduct);  // Emitir evento de WebSocket
        res.send({ status: "success", message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to add product' });
    }
});

ProductRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const message = await productManager.updateProduct(id, product);
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to update product' });
    }
});

ProductRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const message = await productManager.deleteProduct(id);
        req.app.get('io').emit('product-deleted', id);  // Emitir evento de WebSocket
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to delete product' });
    }
});

export { ProductRouter };
