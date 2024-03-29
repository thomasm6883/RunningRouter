// Add an endpoint to fetch the Checkout Session status
import { stripeInstance as stripe } from "../../stripe/stripe.js";

export default async function sessionStatus (req, res) {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send({
    status: session.status,
    payment_status: session.payment_status,
    customer_email: customer.email
  });
};
