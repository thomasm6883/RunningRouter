import React from 'react'
import Banner from './Banner.jsx'
import MapCreate from './mapComponents/MapCreate.jsx'
import MapCenter from './mapComponents/MapCenter.jsx'
import CustomModal from './Modal.jsx'
import MapDraw from './mapComponents/MapDraw.jsx'
import StartRoute from './StartRoute.jsx'
import MapInsertPoint from './mapComponents/MapInsertPoint.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('login');
  const [map, setMap] = React.useState(null);
  return (
    <>
    <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setShowModal={setShowModal} />
    <MapCreate map={map} setMap={setMap} />
    <MapDraw map={map} setMap={setMap}/>
    <MapCenter map={map} setMap={setMap}/>
    <MapInsertPoint map={map} coordinate={null}/>
    <StartRoute map={map} setMap={setMap}/>
    <CustomModal showModal={showModal} setShowModal={setShowModal} modalContent={modalContent} />
    </>

  )
}

export default App
