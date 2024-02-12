import React from 'react'
import Banner from './Banner.jsx'
import Map from './Map.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  return (
    <>
    <Banner loggedIn={loggedIn} />
    <Map />
    </>

  )
}

export default App
