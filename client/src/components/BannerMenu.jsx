import React from 'react';

import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import FormForgot from './forms/FormForgot';
import FormConfirmPin from './forms/FormConfirmPin';
import FormReset from './forms/FormReset';

import PropTypes from 'prop-types';


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
            { (loggedIn) ? (<><a aria-label='Your Account'>profile</a></>) : (<><button className='loginButton' onClick={()=>onClick('login')}>Login</button> <button className='registerButton' onClick={()=>onClick('register')}>Register</button></>) }
        </div>

    );
};
BannerMenu.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setModalContent: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
}


export default BannerMenu;
