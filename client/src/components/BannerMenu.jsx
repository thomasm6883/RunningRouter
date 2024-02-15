import React from 'react';

import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import FormForgot from './forms/FormForgot';
import FormConfirmPin from './forms/FormConfirmPin';
import FormReset from './forms/FormReset';

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



    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onClick = (type) => {
        if (type === 'login') {
          setModalContent(<FormLogin handleClose={handleClose} setLoggedIn={setLoggedIn} setModalContent={setModalContent} setUserData={setUserData} />);
        } else if (type === 'register') {
          setModalContent(<FormRegister handleClose={handleClose} setLoggedIn={setLoggedIn} />);
        } else if (type === 'forgot') {
          setModalContent(<FormForgot handleClose={handleClose}/>);
        } else if (type === 'confirmPin') {
          setModalContent(<FormConfirmPin handleClose={handleClose}/>);
        } else if (type === 'reset') {
          setModalContent(<FormReset handleClose={handleClose}/>);
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
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{userData.email}</span>
                <span className="block truncate text-sm font-medium">
                {userData.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Routes</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} >Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
          <div className="flex flex-wrap gap-2">
            <Button outline gradientDuoTone="purpleToBlue" className="loginButton" onClick={() => onClick("login")}>
              Login
            </Button>
            <Button outline gradientDuoTone="purpleToBlue"
              className="registerButton"
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
