import { Router } from "express";
const cartsRouter = Router();
import { 
    getCarts, 
    //getCartById, 
    addCart, 
    addProductToCart, 
    //deleteAllCarts, 
    deleteCartById, 
    deleteProductInCart, 
    getProductsInCart 
} from "../controllers/cartManager.js";

cartsRouter.get("/", getCarts);
cartsRouter.post("/", addCart);
cartsRouter.get("/:cid", getProductsInCart);
cartsRouter.delete("/:cid", deleteCartById);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.delete("/:cid/product/:pid", deleteProductInCart);

export default cartsRouter;