import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { fetchClientSecret } from '../../requests/stripeRequests';
import { Button, Label, Modal, TextInput } from 'flowbite-react';


// import DotEnv from 'dotenv';
// DotEnv.config();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OqmizAzZWJ2Ag6GOXDCgnAwHJS7oIRCeZGFhfR7Xzxh81mNl9MTpkSDbbinrkzyJcS6WpMeatQIC7AgVpMoivq600wuwJzeKG', {      // process.env.STRIPE_PUBLIC_KEY
});

const TestStripeForm = () => {

  const options = {fetchClientSecret};

  return (
    <div className='w-full max-h-full z-30 overflow-scroll '>
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}

    >
      <EmbeddedCheckout  />
    </EmbeddedCheckoutProvider>
    </div>
  )
}

export default TestStripeForm;




/**
 * const TestStripeForm = () => {
  const [clientSecret, setClientSecret] = React.useState(null);
  React.useEffect(() => {
    const wrapper = async () => {
      const tempClientSecret = await fetchClientSecret("price_1Oqmu1AzZWJ2Ag6GFtzM7YfC");
      setClientSecret(tempClientSecret);
      console.log(tempClientSecret);
    }
    wrapper();

  }, []);
  const options = {clientSecret};

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
 */
