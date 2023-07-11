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
    try {
        const productsInCart = await serviceQtyInCart(req.params.cid);
        res.status(200).send(productsInCart);
    } catch (error) {
        res.status(500).send("Error trying to get quantity");
    }
}

const addCart = async (req, res) => {
    try {
        const addedCart = await serviceAddCart();
        res.status(201).send(addedCart);
    } catch (error) {
        res.status(400).send("Error adding new Cart");
    }

}

const getProductsInCart = async (req, res) => {
    let user = req.session.user;
    try {
        const productsInCart = await serviceGetProductsInCart(req.params.cid);
        let isAdmin = isUserAdmin(user);
        res.status(200).render("cart", { productsInCart, user, isAdmin, title: "Cart", style: "index.css" });
    } catch (error) {
        res.status(500).send("Error trying to get products in cart");
    }
}

const deleteAllProductsInCart = async (req, res) => {
    try {
        const emptyCart = await serviceDeleteAllProductsInCart(req.params.cid);
        res.send(emptyCart);
    } catch (error) {
        res.status(500).send("Error trying to delete all products in Cart");
    }
}

const addProductToCart = async (req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    try {
        const addedProduct = await serviceAddProductToCart(cid, pid);
        res.send(addedProduct);
    } catch (error) {
        res.status(500).send("Error trying to add product to a cart");
    }
}

const deleteProductInCart = async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    try {
        const deletedProduct = await serviceDeleteProductInCart(cid, pid);
        res.send(deletedProduct);
    } catch (error) {
        res.status(500).send("Error trying to delete a product from the cart");
    }
}

const updateProductQty = async (req, res) => {
    try {
        const result = await serviceUpdateProductQty(req.params, req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send("Error trying  to update the product quantity");
    }
}

const purchase = async (req, res) => {
    try {
        const result = await servicePurchase(req.params.cid);
        res.json(result);
    } catch (error) {
        res.status(500).send("Error trying to purchase")
    }
}

export { getProductsInCart, addCart, addProductToCart, deleteProductInCart, deleteAllProductsInCart, updateProductQty, getQtyInCart, purchase }
