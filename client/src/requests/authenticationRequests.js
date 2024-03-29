import { API_URL } from "./API_URL";

export async function login (email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to login')
    console.error(err)
    return false
  }
}

export async function checkCookie () {
  try {
    const response = await fetch(`${API_URL}/cookie`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    if(data.loggedIn === false){
      return false
    } else if (data.loggedIn === true){
      return true
    }
  } catch (err) {
    return false
  }
}

export async function register ( email, password, passwordConfirm ) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, passwordConfirm })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to sign up')
    console.error(err)
    return false
  }
}

export async function logout () {
  try {
    const response = await fetch(`${API_URL}/logout`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to logout')
    console.error(err)
    return false
  }
}

export async function resetPassword (email, accessKey, password, confirmPassword) {
  try {
    const response = await fetch(`${API_URL}/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, accessKey, password, confirmPassword })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to reset password')
    console.error(err)
    return false
  }
}
export async function forgotPassword (email) {
  try {
    const response = await fetch(`${API_URL}/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to reset password')
    console.error(err)
    return false
  }
}

export async function googleOAuth (authCode) {
  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authCode)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json()
  } catch (err) {
    console.error('Failed to authenticate with Google')
    console.error(err)
    return false
  }
}
