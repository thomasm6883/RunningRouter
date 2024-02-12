import React from 'react'
import Banner from './Banner.jsx'
import MapOl from './MapOl.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  return (
    <>
    <Banner loggedIn={loggedIn} />
    <MapOl />
    </>

  )
}

export default App
