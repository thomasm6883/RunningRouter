import stripe from 'stripe';
import DonEnv from 'dotenv';
DonEnv.config();

export const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY); // maybe add new before calling the stripe function
