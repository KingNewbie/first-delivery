import { Router } from 'express';
import { writeCars, getCarById, updateCar, getProductsFromCar, 
         deleteCar, addProductToCar, removeProductFromCar } from '../controllers/cars.js';
 

const CarRouter = Router();

CarRouter.post("/", writeCars);

CarRouter.get("/:id", getCarById);

CarRouter.put("/:id", updateCar);

CarRouter.delete("/:id", deleteCar);

CarRouter.post('/:cid/products/:pid', addProductToCar);

CarRouter.delete('/:cid/products/:pid', removeProductFromCar); 

CarRouter.get('/:cid/products', getProductsFromCar);

export {CarRouter}; 


