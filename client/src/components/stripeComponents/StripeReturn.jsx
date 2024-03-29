// Retrieve a Checkout Session
// Use the session ID
import React, { useEffect } from 'react';
import { createPortalSession } from '../../requests/stripeRequests';

const StripeReturn = () => {

  const [sessionId, setSessionId] = React.useState(null);

  async function initialize() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    const response = await fetch(`/api/session-status?session_id=${sessionId}`);
    const session = await response.json();
  // Handle the session according to its status
    if (session.status == 'open') {
      // Remount embedded Checkout
      window.location.replace('http://localhost:3000/stripe-return')
    } else if (session.status == 'complete') {
      setSessionId(sessionId);
      document.getElementById('success').classList.remove('hidden');
      document.getElementById('customer-email').textContent = session.customer_email;
      // Show success page
      // Optionally use session.payment_status or session.customer_email
      // to customize the success page

      // Make a request to your server to create a new subscription entry
      // Success Animation
      // Redirect to App

    }
  }

  const handleOpenPortal = () => {
    const wrapper = async () => {
      //const portalSession = await createPortalSession(sessionId);
      // window.location.href = portalSession.url;
      window.location.href = 'https://billing.stripe.com/p/login/test_8wM9BNdmr7YscpidQQ'
    }
    wrapper()
  }

    useEffect(() => {
        initialize();
    }, []);
    return (
        <div>
            <h1>Stripe Return</h1>
            <div id="success" className="hidden">
                <p>Payment successful! Your customer email is <span id="customer-email"></span>.</p>
                <button onClick={handleOpenPortal} >Open Customer Portal</button>
            </div>
        </div>
    )
}

export default StripeReturn;





