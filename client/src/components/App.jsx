import React from 'react'
import Banner from './Banner.jsx'
import MapCreate from './MapCreate.jsx'
import MapCenter from './MapCenter.jsx'
import MapDraw from './MapDraw.jsx'
import CustomModal from './Modal.jsx'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('login');
  return (
    <>
    <Banner loggedIn={loggedIn} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setShowModal={setShowModal} />
    <MapCreate>
      <MapCenter />
    </ MapCreate>
    <CustomModal showModal={showModal} setShowModal={setShowModal} modalContent={modalContent} />
    </>

  )
}

export default App
