import React from 'react'
import Banner from './Banner.jsx'
import CustomModal from './Modal.jsx'
import MapContainer from './MapContainer.jsx'
import SelectRouteBar from './SelectRouteBar.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import { getUser } from '../requests/accountRequests.js'
import { checkCookie } from '../requests/authenticationRequests.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MapContext from './mapComponents/MapContext.jsx'
export const GlobalContext = React.createContext(null)
import StartRoute from './StartRoute.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});
  const [showBar, setShowBar] = React.useState(false)
  const [routes, setRoutes] = React.useState([])
  const [routesType, setRoutesType] = React.useState('My Routes')
  const [map, setMap] = React.useState(null)
  const [startLoc, setStartLoc] = React.useState(null)

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
    <MapContext.Provider value={{ map, setMap }}>
    <GoogleOAuthProvider clientId="954079927112-48qrn73bql7ma5c6qc7t8mddhsagr39v.apps.googleusercontent.com" >
    <GlobalContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData, showModal, setShowModal, modalContent, setModalContent, showBar, setShowBar, routes, setRoutes, routesType, setRoutesType }}>
    <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setShowModal={setShowModal} userData={userData} setUserData={setUserData} setShowBar={setShowBar} />
    <DropdownMenu setRoutes={setRoutes} />
    <MapContainer />
    <SelectRouteBar showBar={showBar} setShowBar={setShowBar} routes={routes} setRoutes={setRoutes} routesType={routesType} setRoutesType={setRoutesType} setShowModal={setShowModal} setModalContent={setModalContent} />
    <CustomModal showModal={showModal} setShowModal={setShowModal} modalContent={modalContent} />
    <StartRoute startLoc = {startLoc} setStartLoc = {setStartLoc}/>
    </GlobalContext.Provider>
    </GoogleOAuthProvider>
    </MapContext.Provider>
    </>

  )
}

export default App
