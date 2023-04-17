import CartsDAOMongoDB from "../db/daos/carts.dao.js";
import cartSchema from "../db/models/carts.model.js";
const cartDAO = new CartsDAOMongoDB("carts", cartSchema);

const serviceGetCarts = async () =>{
    let carts = await cartDAO.getCarts();
    return carts;
}

const serviceAddCart = async () =>{
    let newCart = await cartDAO.addCart();
    return newCart;
}

const serviceGetCartById = async (cid) =>{
    let cart = await cartDAO.getCartById(cid);
    return cart;
}

const serviceDeleteCart = async (cid) =>{
    let deletedCart = await cartDAO.deleteCartById(cid);
    return deletedCart;
}

const serviceDeleteAllCarts = async () =>{
    let deleteAllCarts = await cartDAO.deleteAllCarts();
    return deleteAllCarts;
}

const serviceGetProductsInCart = async (cid) =>{
    let getProducts = await cartDAO.getProductsInCart(cid);
    return getProducts;
}

const serviceAddProductToCart = async (cid, pid) =>{
    let addProductToCart = await cartDAO.addProductToCart(cid, pid);
    return addProductToCart;
}
 
const serviceDeleteProductInCart = async (cid, pid) =>{
    let deleteProductOnCart = await cartDAO.deleteProductInCart(cid, pid);
    return deleteProductOnCart;
}

export {serviceAddProductToCart, serviceDeleteAllCarts, serviceDeleteCart, serviceDeleteProductInCart, serviceGetCartById, serviceGetCarts, serviceGetProductsInCart, serviceAddCart}