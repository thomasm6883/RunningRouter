import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { fetchClientSecret } from '../../requests/stripeRequests';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { GlobalContext } from '../App.jsx';

// import DotEnv from 'dotenv';
// DotEnv.config();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OqmizAzZWJ2Ag6GOXDCgnAwHJS7oIRCeZGFhfR7Xzxh81mNl9MTpkSDbbinrkzyJcS6WpMeatQIC7AgVpMoivq600wuwJzeKG', {      // process.env.STRIPE_PUBLIC_KEY
});

const EmbeddedStripeCheckout = () => {
  const { showStripeDrawer } = React.useContext(GlobalContext)

  const fetchClientSecretStripeCallback = async () => {return await fetchClientSecret(showStripeDrawer.option)}
  const options = {fetchClientSecret: fetchClientSecretStripeCallback};


  return (
    <div className='max-h-full'>
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}

    >
      <EmbeddedCheckout  />
    </EmbeddedCheckoutProvider>
    </div>
  )
}

export default EmbeddedStripeCheckout;
