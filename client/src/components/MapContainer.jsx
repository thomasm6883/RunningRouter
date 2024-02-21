import React from 'react'
import MapCreate from './MapCreate.jsx'
import MapCenter from './MapCenter.jsx'
import '../styles/Map.css'

const MapContainer = () => {
  return (
    <div className='mapContainer'>
      <MapCreate>
      <MapCenter />
    </ MapCreate>
    </div>
  )
}

export default MapContainer
