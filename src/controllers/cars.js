import { request, response } from 'express';
import { CarModel } from '../models/cars.js';
import { productModel } from '../models/products.js';

export const writeCars = async (req = request, res = response) => {
    try {
        const newCar = req.body;
        const car = new CarModel(newCar);
        await car.save();
        return res.status(201).send({ message: 'Car created', car });
    } catch (error) {
        console.log('writeCars -> ', error);
        return res.status(500).send({ error: 'Unable to add car' });
    }
};

export const getCarById = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const car = await CarModel.findById(id);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        return res.render('index', { title: 'Car List', car });
    } catch (error) {
        console.log('getCarById -> ', error);
        return res.status(500).send({ error: 'Unable to fetch car' });
    }
};

export const updateCar = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const message = await CarModel.findByIdAndUpdate(id, car, { new: true });
        return res.json(message);
    } catch (error) {
        console.log('updateCar -> ', error);
        return res.status(500).send({ error: 'Unable to update car' });
    }
};

export const deleteCar = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const car = await CarModel.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        return res.send({ message: 'Car deleted' });
    } catch (error) {
        console.log('deleteCar -> ', error);
        return res.status(500).send({ error: 'Unable to delete car' });
    }
};

export const addProductToCar = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const car = await CarModel.findById(cid);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        const product = car.products.find(product => product.id === pid);
        if (product) {
            product.quantity++;
        } else {
            car.products.push({ id: pid, quantity: 1 });
        }
        await car.save();
        return res.send({ message: 'Product added to car' });
    } catch (error) {
        console.log('addProductToCar -> ', error);
        return res.status(500).send({ error: 'Unable to add product to car' });
    }
};

export const removeProductFromCar = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const car = await CarModel.findById(cid);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        car.products = car.products.filter(product => product.id !== pid);
        await car.save();
        return res.send({ message: 'Product removed from car' });
    } catch (error) {
        console.log('removeProductFromCar -> ', error);
        return res.status(500).send({ error: 'Unable to remove product from car' });
    }
};

export const getProductsFromCar = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const car = await CarModel.findById(cid).populate('products.product');
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        return res.send({ status: 'success', products: car.products });
    } catch (error) {
        console.log('getProductsFromCar -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to fetch products from car' });
    }
};

export const updateCart = async (req = request, res = response) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const cart = await CarModel.findByIdAndUpdate(cid, { products }, { new: true });
        return res.send({ status: 'success', cart });
    } catch (error) {
        console.log('updateCart -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to update cart' });
    }
};

export const updateProductQuantity = async (req = request, res = response) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const car = await CarModel.findById(cid);
        const productIndex = car.products.findIndex(p => p.id === pid);
        if (productIndex !== -1) {
            car.products[productIndex].quantity = quantity;
            await car.save();
            return res.send({ status: 'success', message: 'Product quantity updated' });
        } else {
            return res.status(404).send({ status: 'error', message: 'Product not found in car' });
        }
    } catch (error) {
        console.log('updateProductQuantity -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to update product quantity' });
    }
};

export const clearCart = async (req = request, res = response) => {
    const { cid } = req.params;
    try {
        const car = await CarModel.findById(cid);
        car.products = [];
        await car.save();
        return res.send({ status: 'success', message: 'Cart cleared' });
    } catch (error) {
        console.log('clearCart -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to clear cart' });
    }
};
