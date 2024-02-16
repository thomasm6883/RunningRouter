import React from 'react'
import Banner from './Banner.jsx'
import MapOl from './MapOl.jsx'
import MapCenter from './MapCenter.jsx'
import MapDraw from './MapDraw.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  return (
    <>
    <Banner loggedIn={loggedIn} />
    <MapOl>
      <MapCenter>
        <MapDraw />
      </MapCenter>
    </ MapOl>
    </>

  )
}

export default App
