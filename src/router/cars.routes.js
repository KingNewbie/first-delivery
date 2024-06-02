import { Router } from 'express';
import CarManager from '../controllers/CarManager.js'; // Importación por defecto

const CarRouter = Router();

CarRouter.post("/", async (req, res) => {
    try {
        const newCar = req.body;
        const message = await CarManager.writeCars(newCar);
        res.send({ status:"success",message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to add car' });
    }
});

CarRouter.get("/", async (req, res) => {
    try {
        const cars = await CarManager.getCars();
        res.send(cars);
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch cars' });
    }
});

CarRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const car = await CarManager.getCarById(id);
        if (car) {
            res.send(car);
        } else {
            res.status(404).send({ error: 'Car not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch car' });
    }
});

CarRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const message = await CarManager.updateCar(id, car);
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to update car' });
    }
});

CarRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const message = await CarManager.deleteCar(id);
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to delete car' });
    }
});

CarRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const message = await CarManager.addProductToCar(cid, pid);
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: 'Unable to add product to car' });
    }
});

CarRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const message = await CarManager.removeProductFromCar(cid, pid);
        res.send({ message });
    } catch (error) {
        console.error('Error removing product from car:', error);
        res.status(500).send({ error: 'Unable to remove product from car' });
    }
}); // Cierre del paréntesis

CarRouter.get('/:cid/products', async (req, res) => {
    try {
        const { cid } = req.params;
        const products = await CarManager.getProductsFromCar(cid);
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch products from car' });
    }
});

export {CarRouter}; 


