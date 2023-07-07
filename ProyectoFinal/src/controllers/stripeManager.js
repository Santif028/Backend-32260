import { productModel } from "../models/products.model.js";
import { cartModel } from "../models/carts.model.js";
import PaymentService from "../services/stripe.js";

export const processPayment = async (req, res) => {
    try {
        const { cid } = req.params

        const userCart = await cartModel.findOne({ _id: cid });

        let amount = 0

        for (const item of userCart.products) {
            const product = await productModel.findById(item.product);
            amount += product.price * item.quantity;
        }

        // Crea una carga en Stripe
        const charge = {
            amount,
            currency: 'usd',
        };
        const service = new PaymentService();
        let result = await service.createPaymentIntent(charge);
        console.log(result);

        res.status(200).json({ message: 'Pago procesado correctamente.', result });
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Hubo un error al procesar el pago.' });
    }
};