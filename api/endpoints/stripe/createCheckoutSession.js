import { stripeInstance as stripe } from "../../stripe/stripe.js";
import DotEnv from 'dotenv';
DotEnv.config();
export default async function createCheckoutSession(req, res) {
    const { priceId } = req.body;
    // (Check if the user is authenticated)
    // (Get the user's stripe customer ID from the database)
    // (Create a new checkout session)
    // (Return the session ID to the client)
    // const prices = await stripe.prices.list({
    //   lookup_keys: [req.body.lookup_key],
    //   expand: ['data.product'],
    // });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          // price: prices.data[0].id,
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,

        },
      ],
      mode: 'subscription',
      ui_mode: 'embedded',
      return_url: `${process.env.URL}/stripe-return?session_id={CHECKOUT_SESSION_ID}`,
    });
    // console.log(session);
    // console.log("Client Secret", session.client_secret);
    // console.log("Client id", session.id);

    //res.redirect(303, session.url);
    res.json({ client_secret: session.client_secret });
}


/**
 * const { priceId } = req.body;
    // (Check if the user is authenticated)
    // (Get the user's stripe customer ID from the database)
    // (Create a new checkout session)
    // (Return the session ID to the client)
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,

        },
      ],
      mode: 'subscription',
      success_url: `${process.env.URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}?canceled=true`,
    });

    res.redirect(303, session.url);
 */
