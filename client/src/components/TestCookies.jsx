import React from 'react';
import { API_URL } from '../requests/API_URL';

function TestCookies() {

  const getUser = () => {
    fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  const handleClick = async () => {
    const response = await getUser();
    console.log(response);
    console.log(document.cookie);
  }

  return (
    <div>
      <button onClick={handleClick} >Test Route Cookies</button>
    </div>
  );
}

export default TestCookies;
