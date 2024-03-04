import React from 'react';
import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import '../styles/Banner.css'

import { GlobalContext } from './App.jsx';

import { Avatar, Dropdown, Button } from 'flowbite-react';

import { logout } from '../requests/authenticationRequests';


const BannerMenu = () => {
    const { loggedIn, setLoggedIn, setModalContent, setShowModal, userData, setUserData, setShowBar, setRoutes } = React.useContext(GlobalContext)

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onClick = (type) => {
        if (type === 'login') {
          setModalContent(<FormLogin handleClose={handleClose} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setUserData={setUserData} />);
        } else if (type === 'register') {
          setModalContent(<FormRegister handleClose={handleClose} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setUserData={setUserData} />);
        }
        handleShow();
    }
    const handleLogout = () => {
      const wrapper = async () => {
        const logoutSuccess = await logout()
        if (logoutSuccess) {
          setLoggedIn(false)
        } else{
          alert('Logout failed')
        }
      }
      wrapper()
    }
    handleOpenRoutes = () => {
      setShowBar(true)
    }

    return (
      <div className="bannerMenu">
        {loggedIn ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  placeholderInitials={userData.email ? userData.email.substring(0,1).toUpperCase() : null}
                  rounded
                  img={userData.picture}
                  bordered
                ></Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">{userData.email}</span>

              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => {setRoutes(userData.savedRoutes);setShowBar(true)}}>My Routes</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <Button
              pill
                outline
                gradientDuoTone="purpleToBlue"
                className='login'
                onClick={() => onClick("login")}
              >
                Login
              </Button>
              <Button
              pill
                outline
                gradientDuoTone="purpleToBlue"
                className='register'
                onClick={() => onClick("register")}
              >
                Register
              </Button>
            </div>
          </>
        )}
      </div>
    );
};

export default BannerMenu;
