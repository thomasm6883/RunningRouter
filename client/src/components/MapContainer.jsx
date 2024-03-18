import React, { useState } from 'react';
import MapCreate from './MapCreate.jsx';
import MapCenter from './MapCenter.jsx';
import '../styles/Map.css';

const MapContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === '0' || inputValue === '') {
      alert("Please enter a valid positive integer or null");
    }
    else {
      // Get the value of the distance input
      const distance = inputValue;

      // Get the checkboxes and filter out the unchecked ones
      const checkboxes = document.getElementsByName('option');
      const checkedOptions = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

      // Get the value of the address input
      const address = document.getElementById('addressInput').value;

      // Output the values
      console.log('Distance:', distance);
      console.log('Checked options:', checkedOptions);
      console.log('Address:', address);
    }
  };

  function validateInput(value) {
    if (value === '0' || value === '') {
      return true;
    }
    const number = Number(value);
    if (Number.isInteger(number) && number > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='mapContainer'>
      <button
        className="menuButton button-style"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close Settings' : 'Map Settings'}
      </button>
      {isMenuOpen && (
        <div className='menu'>
          <div className='input-container'>
            <label htmlFor="distanceInput">Enter the distance in miles:</label>
            <input
              id="distanceInput"
              type="number"
              value={inputValue}
              onChange={(e) => {
                if (validateInput(e.target.value)) {
                  setInputValue(e.target.value);
                } else {
                  alert("Please enter a valid positive integer");
                }
              }}
              className="small-input"
            />
          </div>
          <div>
            <p>Choose road options:</p>
            <label style={{marginRight: '20px'}}>
              <input type="checkbox" value="Streets" name="option" /> Streets
            </label>
            <label style={{marginRight: '20px'}}>
              <input type="checkbox" value="Highways" name="option" /> Highways
            </label>
            <label style={{marginRight: '20px'}}>
              <input type="checkbox" value="Walkways" name="option" /> Walkways
            </label>
          </div>
          <div className='input-container'>
            <label htmlFor="addressInput">Enter your address, or select the button on the right to place yourself on the map:</label>
            <input
              id="addressInput"
              type="text"
            />
            <button type="button" className="map-button">Select on Map</button>
          </div>
          <button type="submit" className='map-button' onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <MapCreate>
        <MapCenter />
      </MapCreate>
    </div>
  );
};

export default MapContainer;
