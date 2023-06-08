import { Router } from "express";
const cartsRouter = Router();
import {
    getProductsInCart, 
    addCart, 
    addProductToCart, 
    deleteProductInCart, 
    deleteAllProductsInCart, 
    updateProductQty, 
    getQtyInCart,
    purchase
} from "../controllers/cartManager.js";
import { authMiddleware } from "../middlewares/index.js";

cartsRouter.post("/", authMiddleware, addCart);
cartsRouter.get("/quantity/:cid", authMiddleware, getQtyInCart);
cartsRouter.get("/:cid", authMiddleware, getProductsInCart);
cartsRouter.delete("/:cid", authMiddleware, deleteAllProductsInCart);
cartsRouter.post("/:cid/product/:pid", authMiddleware, addProductToCart);
cartsRouter.delete("/:cid/product/:pid", authMiddleware, deleteProductInCart);
cartsRouter.put("/:cid/product/:pid", authMiddleware, updateProductQty)
cartsRouter.post("/:cid/purchase", authMiddleware, purchase);

export default cartsRouter;