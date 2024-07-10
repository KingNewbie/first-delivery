import { Router } from 'express';
import { 
    writeCars, 
    getCarById, 
    updateCar, 
    getProductsFromCar, 
    deleteCar, 
    addProductToCar, 
    removeProductFromCar, 
    updateCart, 
    updateProductQuantity, 
    clearCart 
} from '../controllers/cars.js';

const CarRouter = Router();

CarRouter.post("/", writeCars);
CarRouter.get("/:id", getCarById);
CarRouter.put("/:id", updateCar);
CarRouter.delete("/:id", deleteCar);
CarRouter.post('/:cid/products/:pid', addProductToCar);
CarRouter.delete('/:cid/products/:pid', removeProductFromCar); 
CarRouter.get('/:cid/products', getProductsFromCar);
CarRouter.put('/:cid', updateCart);
CarRouter.put('/:cid/products/:pid', updateProductQuantity);
CarRouter.delete('/:cid', clearCart);

export { CarRouter };



