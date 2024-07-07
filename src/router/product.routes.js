import { Router } from 'express';
import { addProduct, delProduct, updateProduct, getProductById, getProducts } from '../controllers/products.js';



const ProductRouter = Router();

ProductRouter.get("/", getProducts);

ProductRouter.get("/:id", getProductById);

ProductRouter.post("/", addProduct);

ProductRouter.put("/:id", updateProduct);

ProductRouter.delete("/:id", delProduct);

export { ProductRouter };
