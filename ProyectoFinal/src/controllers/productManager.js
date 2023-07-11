import {
    serviceAddProduct,
    serviceDeleteProductById,
    serviceDeleteAllProducts,
    serviceGetProductById,
    serviceGetProducts,
    serviceUpdateProduct
} from "../services/product.js";
import { userModel } from "../models/users.model.js";
import { transporter } from "../utils/mail.js";

const isUserAdmin = (user) => {
    return user && user.role === 'admin';
};

const getProducts = async (req, res) => {
    let user = req.session.user;
    try {
        const products = await serviceGetProducts(req.query);
        let isAdmin = isUserAdmin(user);
        const hasNextPage = products.hasNextPage
        const hasPrevPage = products.hasPrevPage
        const sort = products.sort
        const page = products.page
        const query = products.query
        const allCategories = products.docs.map(element => element.category)
        const categories = allCategories.filter((element, index, self) => self.indexOf(element) === index);
        res.status(200).render("home", { title: "Products", style: "index.css", products, hasNextPage, hasPrevPage, sort, page, query, categories, user, isAdmin });

    } catch (error) {
        res.status(500).send("Error trying to get all products");
    }
}

const getProductById = async (req, res) => {
    const id = req.params.pid;
    let user = req.session.user;
    try {
        let product = await serviceGetProductById(id);
        let isAdmin = isUserAdmin(user);
        res.render("details", { product, user, isAdmin, title: "Products", style: "index.css" });
    } catch (error) {
        res.status(500).send("Error trying to get a product by id")
    }
}

const addProduct = async (req, res) => {
    try {
        const newProduct = await serviceAddProduct(req.body);
        res.status(201).send({ status: "success", message: "Registered succesfully!", payload: newProduct });
    } catch (error) {
        res.status(500).send("Error adding new Product");
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.pid
    try {
        const updateProduct = await serviceUpdateProduct(id, req.body);
        res.status(200).send({ message: "Product updated successfully", updateProduct });
    } catch (error) {
        res.status(500).send("Error trying to update product");
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        const deleteAllProducts = await serviceDeleteAllProducts();
        res.status(200).send({ message: "Products deleted", deleteAllProducts });
    } catch (error) {
        res.status(500).send("Error trying to delete all products")
    }
}

const deleteProductById = async (req, res) => {
    const id = req.params.pid;
    try {
        await serviceDeleteProductById(id);

        const premiumUsers = await userModel.find({ role: "premium" }).populate('cartId');

        for (const user of premiumUsers) {
            const cart = user.cartId;
            if (cart) {
                const productExists = cart.products.some(product => product.product.toString() === id);
                if (productExists) {
                    const mailOptions = {
                        from: process.env.GMAIL,
                        to: user.email,
                        subject: "Eliminación de producto en carrito",
                        text: `Estimado ${user.first_name},\n\nEl producto en su carrito ha sido eliminado.`,
                    };

                    await transporter.sendMail(mailOptions);

                    cart.products = cart.products.filter(product => product.product.toString() !== id);
                    await cart.save();
                }
            }
        }

        res.status(200).send("Product deleted successfully");
    } catch (error) {
        res.status(500).send("Error trying to delete the product");
    }
}

export { addProduct, getProducts, deleteAllProducts, deleteProductById, getProductById, updateProduct };