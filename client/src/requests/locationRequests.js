import { API_URL } from './API_URL';

export const getLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/locations`);
  
      if (response.status >= 400) {
        throw new Error(`Request failed with response code ${response.status}`)
      }
      return response.json();
    }
    catch (err) {
      console.error('Failed to get Any Locations')
      console.error(err)
      return false
    }
  };

export const saveLocation = async (route) => {
    try {
      const response = await fetch(`${API_URL}/locations`, {
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
      console.error('Failed to save Location')
      console.error(err)
      return false
    }
  };


export const deleteLocation = async (id) => {
  const deleteRoute = {_id : id}

  try {
    const response = await fetch(`${API_URL}/locations`, {
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
    console.error('Failed to delete Location')
    console.error(err)
    return false
  }
};