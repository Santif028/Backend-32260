import Stripe from "stripe";
import { productModel } from "../models/products.model.js";
import { cartModel } from "../models/carts.model.js";
import PaymentService from "../services/stripe.js";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
    try {
        const { cid } = req.params

        const userCart = await cartModel.findById(cid).populate('products.product');

        let amount = 0

        for (const item of userCart.products) {
            const product = await productModel.findById(item.product);
            amount += product.price * item.quantity;
        }

        // Crea una carga en Stripe
        const charge = await stripeClient.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        console.log(charge);

        res.status(200).json({ clientSecret: charge.client_secret});
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Hubo un error al procesar el pago.' });
    }
};