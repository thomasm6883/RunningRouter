import React from 'react';
import FormLogin from './forms/FormLogin';
import FormRegister from './forms/FormRegister';
import '../styles/Banner.css'
import { GlobalContext } from './App.jsx';
import { Avatar, Dropdown, Button } from 'flowbite-react';
import { logout } from '../requests/authenticationRequests';
import { Flowbite } from 'flowbite-react';

const BannerMenu = () => {
    const { loggedIn, setLoggedIn, setModalContent, setShowModal, userData, setShowBar, setRoutes } = React.useContext(GlobalContext)

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onClick = (type) => {
        if (type === 'login') {
          setModalContent(<FormLogin handleClose={handleClose} />);
        } else if (type === 'register') {
          setModalContent(<FormRegister handleClose={handleClose} />);
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
    const handleOpenRoutes = () => {
      setRoutes(userData.savedRoutes)
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
              <button
                className="m-0 transition text-left text-sm ease-in-out delay-150 bg-gradient-to-r from-blue-600 via-green-500
                to-indigo-400 from-0% via-20% to-40% py-2 px-4 w-full text-transparent bg-clip-text
                hover:text-solid hover:bg-clip-border hover:-translate-y-1 hover:scale-110 hover:bg-purple-500
                hover:duration-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500 hover:from-0% hover:via-50% hover:to-100%"
                onClick={() => console.log('Upgrade')}
              >
                Upgrade
              </button>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleOpenRoutes}>My Routes</Dropdown.Item>
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
