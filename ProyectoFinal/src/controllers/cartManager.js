import {
    serviceAddCart,
    serviceAddProductToCart,
    serviceDeleteAllProductsInCart,
    serviceDeleteProductInCart,
    serviceGetProductsInCart,
    serviceUpdateProductQty,
    serviceQtyInCart,
    servicePurchase
} from "../services/cart.js";

const isUserAdmin = (user) => {
    return user && user.role === 'admin';
};

const getQtyInCart = async (req, res) => {
    const productsInCart = await serviceQtyInCart(req.params.cid);
    res.status(200).send(productsInCart);
}

const addCart = async (req, res) => {
    try {
        const addedCart = await serviceAddCart();
        res.status(201).send(addedCart);
    } catch (error) {
        res.status(400).send({ status: "error", payload: error.message });
    }

}

const getProductsInCart = async (req, res) => {
    const productsInCart = await serviceGetProductsInCart(req.params.cid);
    let user = req.session.user;
    let isAdmin = isUserAdmin(user);
    res.status(200).render("cart", { productsInCart, user, isAdmin, title: "Cart", style: "index.css" });
}

const deleteAllProductsInCart = async (req, res) => {
    const emptyCart = await serviceDeleteAllProductsInCart(req.params.cid);
    res.send(emptyCart);
}

const addProductToCart = async (req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    const addedProduct = await serviceAddProductToCart(cid, pid);
    res.send(addedProduct);
}

const deleteProductInCart = async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    const deletedProduct = await serviceDeleteProductInCart(cid, pid);
    res.send(deletedProduct);
}

const updateProductQty = async (req, res) => {
    const result = await serviceUpdateProductQty(req.params, req.body);
    res.send(result);
}

const purchase = async (req, res) => {
    const result = await servicePurchase(req.params.cid);
    res.json(result);
}

export { getProductsInCart, addCart, addProductToCart, deleteProductInCart, deleteAllProductsInCart, updateProductQty, getQtyInCart, purchase }
