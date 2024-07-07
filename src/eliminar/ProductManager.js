import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import EventEmitter from 'events';

class ProductManager extends EventEmitter {
    constructor() {
        super();
        this.path = "./src/models/products.json";
    }

    async writeProducts(product) {
        try {
            let products = await fs.readFile(this.path, 'utf-8');
            let productsParse = JSON.parse(products);
            product.id = nanoid();
            let productAll = [...productsParse, product];
            await fs.writeFile(this.path, JSON.stringify(productAll, null, 2));
            this.emit('productAdded', product);  // Emitir evento
            return "Product added successfully!";
        } catch (error) {
            console.error('Error writing products:', error);
            throw new Error('Unable to write products');
        }
    }

    async getProducts() {
        try {
            let products = await fs.readFile(this.path, 'utf-8');
            let productsParse = JSON.parse(products);
            return productsParse;
        } catch (error) {
            console.error('Error reading products:', error);
            throw new Error('Unable to read products');
        }
    }

    async getProductById(id) {
        try {
            let products = await fs.readFile(this.path, 'utf-8');
            let productsParse = JSON.parse(products);
            let productById = productsParse.find(product => product.id === id);
            return productById;
        } catch (error) {
            throw new Error('Unable to read products');
        }
    }

    async updateProduct(id, product) {
        try {
            let products = await fs.readFile(this.path, 'utf-8');
            let productsParse = JSON.parse(products);
            let productIndex = productsParse.findIndex(product => product.id === id);
            if (productIndex === -1) {
                return "Product not found!";
            }
            productsParse[productIndex] = { ...productsParse[productIndex], ...product };
            await fs.writeFile(this.path, JSON.stringify(productsParse, null, 2));
            return "Product updated successfully!";
        } catch (error) {
            throw new Error('Unable to update product');
        }
    }

    async deleteProduct(id) {
        try {
            let products = await fs.readFile(this.path, 'utf-8');
            let productsParse = JSON.parse(products);
            let productIndex = productsParse.findIndex(product => product.id === id);
            if (productIndex === -1) {
                return "Product not found!";
            }
            productsParse.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(productsParse, null, 2));
            this.emit('productDeleted', id);  // Emitir evento
            return "Product deleted successfully!";
        } catch (error) {
            throw new Error('Unable to delete product');
        }
    }
}

export default ProductManager;
