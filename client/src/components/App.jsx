import React from 'react'
import Banner from './Banner.jsx'
import CustomModal from './Modal.jsx'
import MapContainer from './MapContainer.jsx'
import SelectRouteBar from './SelectRouteBar.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import TestCookies from './TestCookies.jsx'
import { getUser } from '../requests/accountRequests.js'
import { checkCookie } from '../requests/authenticationRequests.js'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});
  const [showBar, setShowBar] = React.useState(false)
  const [routes, setRoutes] = React.useState([])
  const [routesType, setRoutesType] = React.useState('My Routes')

  const initialize = async () => {
    const cookie = await checkCookie()
    if (cookie) {
      setLoggedIn(true)
    } else {
      return
    }
    const user = await getUser()
    if (user) {
      setUserData(user)
    }
  }
  React.useEffect(() => {
    initialize()
  }, [])

  return (
    <>
    <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setShowModal={setShowModal} userData={userData} setUserData={setUserData} setShowBar={setShowBar} />
    <DropdownMenu setRoutes={setRoutes} />
    <TestCookies />
    <MapContainer />
    <SelectRouteBar showBar={showBar} setShowBar={setShowBar} routes={routes} setRoutes={setRoutes} routesType={routesType} setRoutesType={setRoutesType} setShowModal={setShowModal} setModalContent={setModalContent} />
    <CustomModal showModal={showModal} setShowModal={setShowModal} modalContent={modalContent} />
    </>

  )
}

export default App
