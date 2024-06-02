import {Router} from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager();

const ProductRouter = Router();


ProductRouter.get("/", async (req, res) => { 
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
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
        res.send({ message });
    } catch (error) {
        console.error('Error adding product:', error);
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
        console.error('Error updating product:', error);
        res.status(500).send({ error: 'Unable to update product' });
    }
});


ProductRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const message = await productManager.deleteProduct(id);
        res.send({ message });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ error: 'Unable to delete product' });
    }
});

export {ProductRouter};