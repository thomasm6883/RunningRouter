import React from 'react'
import MapCreate from './mapComponents/MapCreate.jsx'
import MapCenter from './mapComponents/MapCenter.jsx'
import '../styles/Map.css'

const MapContainer = () => {
  return (
    <div className='mapContainer grow'>
      <MapCreate>
      <MapCenter />
    </ MapCreate>
    </div>
  )
}

export default MapContainer
