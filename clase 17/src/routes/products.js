import { Router } from "express";
const productsRouter = Router();
import { 
    getProducts, 
    getProductById, 
    addProduct, 
    //deleteAllProducts, 
    deleteProductById,
    updateProduct
} from "../controllers/productManager.js";

productsRouter.get("/", getProducts);
productsRouter.get("/:pid", getProductById);
productsRouter.post("/", addProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", deleteProductById);

export default productsRouter