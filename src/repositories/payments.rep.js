import Stripe from "stripe";
import dao from "../data/index.factory.js";
import CheckoutDTO from "../dto/checkout.dto.js";
const { orders } = dao

const stripe = new Stripe(process.env.STRIPE_KEY);

class PaymentsRep {
  constructor() {}
  payment = async (filter) => {
    try {
      let productsOnCart = await orders.read({ filter });
      productsOnCart = productsOnCart.docs.map(x => new CheckoutDTO(x))
      const line_items = productsOnCart;
      const mode = "payment";
      const success_url = "http://localhost:8080/payments/success";
      const intent = await stripe.checkout.sessions.create({ line_items, mode, success_url });
      return intent;
    } catch (error) {
      throw error;
    }
  };
}

const repository = new PaymentsRep();

export default repository;

export const { payment } = repository;