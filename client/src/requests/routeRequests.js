
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

export const saveRoute = async (name, route, length) => {
  try {
    const object = {
      routeName : name,
      route : route.route,
      length : length
    }
    console.log(JSON.stringify(object))
    const response = await fetch(`${API_URL}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object)
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

export const deleteRoute = async (name) => {
  const deleteRoute = {routeName : name}

  try {
    const response = await fetch(`${API_URL}/routes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteRoute),
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


