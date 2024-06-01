import express from 'express';
import ProductManager from './controllers/ProductManager.js'; 

const productManager = new ProductManager(); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => { 
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ error: 'Unable to fetch products' });
    }
});

app.get("/products/:id", async (req, res) => {
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

app.post("/products", async (req, res) => {
    try {
        const newProduct = req.body;
        const message = await productManager.writeProducts(newProduct);
        res.send({ message });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send({ error: 'Unable to add product' });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const message = await productManager.deleteProduct(id);
        res.send({ message });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ error: 'Unable to delete product' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
