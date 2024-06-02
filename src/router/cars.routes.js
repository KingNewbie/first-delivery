import { Router } from 'express';
import CarManager from '../controllers/CarManager.js'; // Importación por defecto

const CarRouter = Router();

CarRouter.post("/", async (req, res) => {
    try {
        const newCar = req.body;
        const message = await CarManager.writeCars(newCar);
        res.send({ message });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).send({ error: 'Unable to add car' });
    }
});

CarRouter.get("/", async (req, res) => {
    try {
        const cars = await CarManager.getCars();
        res.send(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
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
        console.error('Error updating car:', error);
        res.status(500).send({ error: 'Unable to update car' });
    }
});

CarRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const message = await CarManager.deleteCar(id);
        res.send({ message });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).send({ error: 'Unable to delete car' });
    }
});

CarRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const message = await CarManager.addProductToCar(cid, pid);
        res.send({ message });
    } catch (error) {
        console.error('Error adding product to car:', error);
        res.status(500).send({ error: 'Unable to add product to car' });
    }
}
);

export {CarRouter}; 


