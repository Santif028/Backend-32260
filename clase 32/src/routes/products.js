import { Router } from "express";
const productsRouter = Router();
import {
    addProduct, 
    getProducts, 
    //deleteAllProducts, 
    deleteProductById, 
    getProductById, 
    updateProduct
} from "../controllers/productManager.js";
import { authMiddleware, adminOnly } from "../middlewares/index.js"

productsRouter.get("/", authMiddleware, getProducts);
productsRouter.get("/:pid", authMiddleware, getProductById);
productsRouter.post("/", adminOnly,  addProduct);
productsRouter.put("/:pid", adminOnly, updateProduct);
productsRouter.delete("/:pid", adminOnly, deleteProductById);

export default productsRouter