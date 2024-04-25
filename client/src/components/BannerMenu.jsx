import React from 'react';
import FormLogin from './formsAuth/FormLogin.jsx';
import FormRegister from './formsAuth/FormRegister.jsx';
import '../styles/Banner.css'
import { GlobalContext } from './App.jsx';
import { Avatar, Dropdown, Button } from 'flowbite-react';
import { logout } from '../requests/authenticationRequests';
import FormSelectStripeOption from './formsStripe/FormSelectStripeOption.jsx';
import { Flowbite } from 'flowbite-react';
import { getRoutes } from '../requests/routeRequests.js'

const BannerMenu = (props) => {
    const { loggedIn, setLoggedIn, setModalContent, setShowModal, userData, setShowBar, setRoutes, setRoutesType, setLength, setName } = React.useContext(GlobalContext)
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
          window.location.reload()
        } else{
          alert('Logout failed')
        }
      }
      wrapper()
    }
    const handleOpenRoutes = () => {
      console.log("Opening routes")
        getUserRoutes()
        setShowBar(true)
    }
      async function getUserRoutes() {
        console.log("Getting user routes")
        const response = await getRoutes()
        let responseLength = []
        let responseRoutes = []
        let responseName = []
        for (let i = 0; i < response.length; i++) {
          responseLength.push(response[i].length)
          responseRoutes.push({
            route: response[i].route
        })
          responseName.push(response[i].routeName)
        }
        console.log(response)
        setLength(responseLength)
        setRoutes(responseRoutes)
        setName(responseName)
      }

    const handleUpgrade = () => {
      setModalContent(<FormSelectStripeOption handleClose={handleClose} />);
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
              {(!userData.upgradeType) ? <button
                className="m-0 transition text-left text-sm ease-in-out delay-100 bg-gradient-to-r from-blue-600 via-green-500
                to-indigo-400 from-0% via-20% to-40% py-2 px-4 w-full text-transparent bg-clip-text
                hover:text-solid hover:bg-clip-border hover:-translate-y-1 hover:scale-110 hover:bg-purple-500
                hover:duration-200 hover:text-white hover:shadow-lg hover:shadow-cyan-500 hover:from-0% hover:via-50% hover:to-100%"
                onClick={handleUpgrade}
              >
                Upgrade
              </button> : <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  <a href='https://billing.stripe.com/p/login/test_8wM9BNdmr7YscpidQQ' target="_blank">
                    Open Customer Portal
                  </a>
                </div>}
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
