import { request, response } from 'express';
import { productModel } from '../models/products.js';

export const getProducts = async (req = request, res = response, returnData = false) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = query ? { $or: [{ category: query }, { availability: query }] } : {};
        const sortOrder = sort === 'asc' ? 1 : -1;

        const products = await productModel.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort(sort ? { price: sortOrder } : {});

        const totalProducts = await productModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        const responseData = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? parseInt(page) + 1 : null,
            page: parseInt(page),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${parseInt(page) + 1}&sort=${sort}&query=${query}` : null
        };

        if (returnData) {
            return responseData;
        } else {
            return res.json(responseData);
        }
    } catch (error) {
        console.log('getProducts -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to fetch products' });
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ status: 'error', error: 'Product not found' });
        }
        res.json({ status: 'success', payload: product });
    } catch (error) {
        console.log('getProductById -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to fetch product' });
    }
};

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, price, thumbnails, description, code, category, status, stock } = req.body;
        if (!title || !price || !thumbnails || !description || !code || !category || status === undefined || stock === undefined) {
            console.log('addProduct -> Missing fields');
            return res.status(400).send({ status: 'error', error: 'Missing fields' });
        }
        const product = await productModel.create({ title, price, thumbnails, description, code, category, status, stock });
        return res.status(201).send({ status: 'success', message: 'Product added', payload: product });
    } catch (error) {
        console.log('addProduct -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to add product', details: error.message });
    }
};

export const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
        return res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        console.log('updateProduct -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to update product' });
    }
};

export const delProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ status: 'error', error: 'Product not found' });
        }
        return res.send({ status: 'success', message: 'Product deleted', payload: product });
    } catch (error) {
        console.log('delProduct -> ', error);
        return res.status(500).send({ status: 'error', error: 'Unable to delete product' });
    }
};
