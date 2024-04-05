import { API_URL } from "./API_URL";

export async function fetchClientSecret (priceId) {
  priceId = "price_1Oqmu1AzZWJ2Ag6GFtzM7YfC"
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
    console.log(responseBody)

    return responseBody.client_secret
  } catch (err) {
    console.error('Failed to stripe')
    console.error(err)
    return false
  }
}
