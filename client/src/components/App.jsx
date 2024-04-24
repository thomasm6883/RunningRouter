import React from 'react'
import Banner from './Banner.jsx'
import CustomModal from './Modal.jsx'
import MapContainer from './MapContainer.jsx'
import SelectRouteBar from './SelectRouteBar.jsx'
import { getUser } from '../requests/accountRequests.js'
import { checkCookie } from '../requests/authenticationRequests.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MapContext from './mapComponents/MapContext.jsx'
export const GlobalContext = React.createContext(null)

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
  const [length, setLength] = React.useState(0)
  const [name, setName] = React.useState(null)
  const [teamDrawer, setTeamDrawer] = React.useState(false)
  const [featureDrawer, setFeatureDrawer] = React.useState(false)

  const [showGenerateRouteDrawer, setShowGenerateRouteDrawer] = React.useState(false)

  const [showStripeDrawer, setShowStripeDrawer] = React.useState({show: false, option: null});

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
    <MapContext.Provider value={{ map, setMap }}>
    <GoogleOAuthProvider clientId="954079927112-48qrn73bql7ma5c6qc7t8mddhsagr39v.apps.googleusercontent.com" >
    <GlobalContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData, setShowModal, modalContent, setModalContent, setShowBar, routes, setRoutes, routesType, setRoutesType, showGenerateRouteDrawer, setShowGenerateRouteDrawer, startLoc, setStartLoc, setLength, length, name, setName, teamDrawer, setTeamDrawer, featureDrawer, setFeatureDrawer, showStripeDrawer, setShowStripeDrawer }}>
    <Banner showGenerateRouteDrawer={showGenerateRouteDrawer} />
    <MapContainer />
    <SelectRouteBar showBar={showBar} setShowBar={setShowBar} routes={routes} setRoutes={setRoutes} routesType={routesType} setRoutesType={setRoutesType} setShowModal={setShowModal} setModalContent={setModalContent} length = {length} setLength={setLength} loggedIn={loggedIn} name={name} showStripeDrawer={showStripeDrawer} setShowStripeDrawer={setShowStripeDrawer}/>
    <CustomModal showModal={showModal} setShowModal={setShowModal} modalContent={modalContent} />

    </GlobalContext.Provider>
    </GoogleOAuthProvider>
    </MapContext.Provider>

  )
}

export default App
