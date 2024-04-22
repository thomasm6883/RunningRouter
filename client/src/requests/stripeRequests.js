import { API_URL } from "./API_URL";

const runningRouterProProductID = "price_1Oqmu1AzZWJ2Ag6GFtzM7YfC"
const runningRouterProUnlimitedProductID = "price_1OqmvuAzZWJ2Ag6GOgqxaMXs"

export async function fetchClientSecret (productOption) {
  let priceId = ''
  if (productOption === 'Running-Router-Pro') {
    priceId = runningRouterProProductID
  } else if (productOption === 'Running-Router-Pro-Unlimited') {
    priceId = runningRouterProUnlimitedProductID
  }
  try {
    const response = await fetch(`${API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ priceId })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    const responseBody = await response.json()
    //console.log(responseBody)

    return responseBody.client_secret
  } catch (err) {
    console.error('Failed to stripe')
    console.error(err)
    return false
  }
}

export async function fetchSessionStatus (sessionId) {
  try {
    const response = await fetch(`${API_URL}/session-status?session_id=${sessionId}`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    const responseBody = await response.json()
    //console.log(responseBody)

    return responseBody
  } catch (err) {
    console.error('Failed to stripe')
    console.error(err)
    return false
  }
}

export async function createPortalSession (session_id) {
  try {
    const response = await fetch(`${API_URL}/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session_id })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    const responseBody = await response.json()
    //console.log(responseBody)

    return responseBody
  } catch (err) {
    console.error('Failed to stripe')
    console.error(err)
    return false
  }
}
