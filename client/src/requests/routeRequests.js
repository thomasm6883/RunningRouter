
import { API_URL } from './API_URL';

export const getRoutes = async () => {
  try {
    const response = await fetch(`${API_URL}/routes`);

    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json();
  }
  catch (err) {
    console.error('Failed to get routes')
    console.error(err)
    return false
  }
};

export const saveRoute = async (route) => {
  try {
    const response = await fetch(`${API_URL}/routes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json();
  }
  catch (err) {
    console.error('Failed to save route')
    console.error(err)
    return false
  }
};

export const deleteRoute = async (id) => {
  try {
    const response = await fetch(`${API_URL}/routes/${id}`, {
        method: 'DELETE',
    });
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response.json();
  }
  catch (err) {
    console.error('Failed to delete route')
    console.error(err)
    return false
  }
};



