import { request, response } from 'express';
import { productModel } from '../models/products.js';

export const getProducts = async (req = request, res = response) => {
    try {
        const products = await productModel.find();
        res.render('index', { title: 'Product List', products });
    } catch (error) {
        console.log('getProducts -> ', error);
        return res.status(500).send({ error: 'Unable to fetch products' });
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const products = await productModel.findById(id);
        if (!products) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.render('index', { title: 'Product List', products });
    } catch (error) {
        console.log('getProducts -> ', error);
        return res.status(500).send({ error: 'Unable to fetch products' });
    }
};

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, price, thumbnails, description, code, category, status } = req.body;
        if (!title || !price || !thumbnails || !description || !code || !category || status === undefined) {
            return res.status(400).send({ error: 'Missing fields' });
        }
        const product = await productModel.create({ title, price, thumbnails, description, code, category, status });
        return res.json(product);
    } catch (error) {
        console.log('addProduct -> ', error);
        return res.status(500).send({ error: 'Unable to fetch products' });
    }
};

export const updateProduct = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const message = await productModel.findByIdAndUpdate
            (id, product, { new: true });
        return res.json(message);
    } catch (error) {
        console.log('update -> ', error);
        return res.status(500).send({ error: 'Unable to fetch products' });
    }
};

export const delProduct = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.json(product);
    } catch (error) {
        console.log('delProduct -> ', error);
        return res.status(500).send({ error: 'Unable to fetch products' });
    }
};