import { API_URL } from './API_URL';

/** loc is an object containing 'latitude','longitude', and 'distance' which is the radius of search */
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

  /*loc{
      "Location" array [0: latitude , 1: logitude]
      "LocationType" : string with type e.g. "Hazard"
      "Description" : string with a description of hazard

      }*/
export const saveLocation = async (loc) => {
    try {
      console.log('loc', loc)
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

/** id is a string with the mongodb id */
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
