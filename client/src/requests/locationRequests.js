import { API_URL } from './API_URL';

//dk get function is not done
export const getLocations = async (loc) => {
    try {
      const response = await fetch(`${API_URL}/locations/${loc.latitude}/${loc.longitude}/${loc.distance}`);
  
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

export const saveLocation = async (loc) => {
    try {
      const response = await fetch(`${API_URL}/locations`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loc),
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