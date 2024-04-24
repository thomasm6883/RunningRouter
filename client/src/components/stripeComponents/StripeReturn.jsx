// Retrieve a Checkout Session
// Use the session ID
import React, { useEffect } from 'react';
import { createPortalSession } from '../../requests/stripeRequests';
import { WEB_URL } from '../../requests/API_URL';

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
  const customerPortalLink = 'https://billing.stripe.com/p/login/test_8wM9BNdmr7YscpidQQ'

    useEffect(() => {
        initialize();
    }, []);
    return (
      <div className="flex justify-center p-6">
        <div className="flex flex-col justify-items-center w-fit">
          <h1 className="text-center font-sans text-3xl font-semibold text-green-500 ">
            Upgrade Success!
          </h1>
          <div id="success" className="hidden">
            <div className="flex flex-col justify-center w-fit text-center">
              <p>
                Payment successful! Your customer email is{" "}
                <span id="customer-email"></span>.
              </p>
              <div className="flex flex-row justify-between">
                <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  <a href={customerPortalLink} target="_blank">
                    Open Customer Portal
                  </a>
                </div>
                <div className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <a href={WEB_URL}>Return to App</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default StripeReturn;





