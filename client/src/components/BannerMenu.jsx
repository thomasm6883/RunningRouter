import React from 'react';

import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import FormForgot from './forms/FormForgot';
import '../styles/Banner.css'


import PropTypes from 'prop-types';

import { Avatar, Dropdown, Button } from 'flowbite-react';

import { logout } from '../requests/authenticationRequests';


const BannerMenu = (props) => {
    const loggedIn = props.loggedIn;
    const setLoggedIn = props.setLoggedIn;
    const setModalContent = props.setModalContent;
    const setShowModal = props.setShowModal;
    const userData = props.userData;
    const setUserData = props.setUserData;
    const setShowBar = props.setShowBar;

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
                  rounded
                ></Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">{userData.email}</span>

              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => {setShowBar(true)}}>My Routes</Dropdown.Item>
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
BannerMenu.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    setModalContent: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
}


export default BannerMenu;
