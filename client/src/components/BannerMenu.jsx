import React from 'react';

import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import FormForgot from './forms/FormForgot';
import FormConfirmPin from './forms/FormConfirmPin';
import FormReset from './forms/FormReset';

import PropTypes from 'prop-types';

import { Avatar, Dropdown, Button } from 'flowbite-react';


const BannerMenu = (props) => {
    const loggedIn = props.loggedIn;
    const setModalContent = props.setModalContent;
    const setShowModal = props.setShowModal;



    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onClick = (type) => {
        if (type === 'login') {
          setModalContent(<FormLogin handleClose={handleClose}/>);
        } else if (type === 'register') {
          setModalContent(<FormRegister handleClose={handleClose}/>);
        } else if (type === 'forgot') {
          setModalContent(<FormForgot handleClose={handleClose}/>);
        } else if (type === 'confirmPin') {
          setModalContent(<FormConfirmPin handleClose={handleClose}/>);
        } else if (type === 'reset') {
          setModalContent(<FormReset handleClose={handleClose}/>);
        }
        handleShow();
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
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
          <div className="flex flex-wrap gap-2">
            <Button outline gradientDuoTone="purpleToBlue" className="loginButton" onClick={() => onClick("login")}>
              Login
            </Button>{" "}
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
    setModalContent: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
}


export default BannerMenu;
