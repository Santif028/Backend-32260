import {
    serviceAddProductToCart,
    serviceDeleteAllCarts,
    serviceDeleteCart,
    serviceDeleteProductInCart,
    serviceGetCartById,
    serviceGetCarts,
    serviceGetProductsInCart,
    serviceAddCart
} from "../services/cart.js";


const getCarts = async (req, res) => {
    const carts = await serviceGetCarts();
    res.send(carts);
}

const getCartById = async (req, res) =>{
    const id = req.params.cid
    const cart = await serviceGetCartById(id);
    res.send(cart);
}

const addCart = async (req, res) =>{
    const newCart = await serviceAddCart();
    res.send(newCart);
}
 
const getProductsInCart = async (req, res) => {
    const id = req.params.cid;
    const productsInCart = await serviceGetProductsInCart(id);
    productsInCart.forEach(element => {
        console.log(element.product.title);
    });
    res.render("cart", { productsInCart, title: "Cart", style: "index.css" });
}

const deleteCartById = async (req, res) =>{
    const id = req.params.cid;
    const removedCart = await serviceDeleteCart(id);
    res.send(removedCart);
}

const deleteAllCarts = async (req, res) =>{
    const removedCarts = await serviceDeleteAllCarts();
    res.send(removedCarts);
}

const addProductToCart = async (req, res) =>{
    const idProd = req.params.pid;
    const idCart = req.params.cid;
    const addedProduct = await serviceAddProductToCart(idCart, idProd);
    res.send(addedProduct);
}

const deleteProductInCart = async (req, res) =>{
    const idProd = req.params.pid;
    const idCart = req.params.cid;
    const deleteProduct = await serviceDeleteProductInCart(idCart, idProd);
    res.send(deleteProduct);
}

export { getCarts, getCartById, getProductsInCart, addCart, addProductToCart, deleteAllCarts, deleteCartById, deleteProductInCart}