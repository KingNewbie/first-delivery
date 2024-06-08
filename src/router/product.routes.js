import { Router } from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager();
const ProductRouter = Router();

export function configureSocketIO(io) {
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    productManager.on('productAdded', (product) => {
        io.emit('product-added', product);
    });
}

ProductRouter.get("/", async (req, res) => { 
    try {
        const products = await productManager.getProducts();
        res.render('index', { products });
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
        res.send({ status:"success", message });
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
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to delete product' });
    }
});

export { ProductRouter };
