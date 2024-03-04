import { API_URL } from "./API_URL";

export const changePassword = async (password, passwordConfirm) => {
  try{
    const response = await fetch(`${API_URL}/account/change-password`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(password, passwordConfirm),
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json();
  }
  catch (err){
    console.error('Failed to change password')
    console.error(err)
    return false
  }
};

export const changeEmail = async (email) => {
  try{
    const response = await fetch(`${API_URL}/account/change-email`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json();
  }
  catch (err){
    console.error('Failed to change email')
    console.error(err)
    return false
  }
};

export async function deleteUser () { // Input of password instead ---TO DO---
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'DELETE'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to remove stock')
    console.error(err)
    return false
  }
}

export async function getUser () {
  try {
    const response = await fetch(`${API_URL}/user`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve user')
    console.error(err)
    return null
  }
}
