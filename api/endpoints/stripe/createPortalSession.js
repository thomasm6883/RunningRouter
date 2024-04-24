import { stripeInstance as stripe } from "../../stripe/stripe.js";
const YOUR_DOMAIN = 'http://localhost:3000';
export default async function createPortalSession(req, res) {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const session_id = req.body.session_id
  // console.log("session id: ", session_id);
  // console.log("req body: ", req.body)
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
}
