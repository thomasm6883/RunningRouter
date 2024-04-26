import React from 'react';
import BannerMenu from './BannerMenu.jsx';
import Logo from './svgComponents/Logo.jsx';
import '../styles/Banner.css';
import { Navbar } from 'flowbite-react';
import GenerateRouteDrawer from './routeBarComponents/GenerateRouteDrawer.jsx';
import { GlobalContext } from './App.jsx';
import StripeDrawer from './stripeComponents/StripeDrawer.jsx';
//TODO what does this component does
//import TestStripeForm from './formsStripe/TestStripeForm.jsx';
import { getRoutes } from '../requests/routeRequests.js';
import MapInteractionDrawer from './routeBarComponents/MapInteractionDrawer.jsx';
import TeamDrawer from './navbarComponents/TeamDrawer.jsx';
import FeatureDrawer from './navbarComponents/FeatureDrawer.jsx';

const Banner = () => {
  const [showStripeDrawer, setShowStripeDrawer] = React.useState(false);
  const [showMapDrawer, setMapDrawer] = React.useState(false);

  const { showGenerateRouteDrawer, setShowGenerateRouteDrawer, userData, setShowBar, setRoutes, setRoutesType, setLength, loggedIn, setName, setTeamDrawer, teamDrawer, setFeatureDrawer, featureDrawer } = React.useContext(GlobalContext);
  const handleOpenGenerateRouteDrawer = () => {
    console.log('open drawer');
    setShowBar(false);
    setShowGenerateRouteDrawer(true);
    //console.log('showGenerateRouteDrawer', showGenerateRouteDrawer);
  }
  const handleOpenRoutes = () => {
    if(loggedIn) {
    getUserRoutes()
    setShowBar(true)
    } else {
      alert('Please log in to view your routes')
    }
  }
  const handleOpenTeam = () => {
    setTeamDrawer(true)
  }

  const handleOpenFeature = () => {
    if(loggedIn) {
      setFeatureDrawer(true)
    } else {
      alert('Please log in to get hazard points')
    }
  }

  async function getUserRoutes() {
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

  return (
    <div className='banner'>
      <div className="shadow-lg">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <Logo className="pr-1 sm:smallLogo md:largeLogo" />
          <span className="self-center whitespace-nowrap ml-2 md:text-3xl font-semibold dark:text-white">
            Running Router
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <BannerMenu />
        </div>
      </Navbar>
      </div>
      <div className="SubNavBar">
      <nav className="bg-gray-100 dark:bg-gray-700 shadow-inner shadow">
        <div className="max-w-screen px-4 py-3 mx-auto">
          <div className="flex items-left">
            <ul className="flex flex-row font-medium mt-0 space-x-8 text-sm">
              <li>
                <button className="text-gray-900 dark:text-white hover:underline" onClick={handleOpenGenerateRouteDrawer} >
                  Generate a Route
                </button>
              </li>
              <li>
                <button className="text-gray-900 dark:text-white hover:underline" onClick={handleOpenRoutes}>
                  My Routes
                </button>
              </li>
              <li>
                <button className="text-gray-900 dark:text-white hover:underline">
                  Team
                </button>
              </li>
              <li>
                {/* TODO Make this on click if not logged in cant do */}
                <button
                  className="text-gray-900 dark:text-white hover:underline" onClick={handleOpenFeature}>
                  Hazards
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
      <GenerateRouteDrawer showGenerateRouteDrawer={showGenerateRouteDrawer} />
      <StripeDrawer show={showStripeDrawer} onClose={()=>setShowStripeDrawer(false)} >{(showStripeDrawer) ? null : null}</StripeDrawer>
      <MapInteractionDrawer />
      {/* <TeamDrawer show={teamDrawer} onClose={()=>setTeamDrawer(false)} /> */}
      <FeatureDrawer show={featureDrawer} onClose={()=>setFeatureDrawer(false)} />
    </div>
  );
};

export default Banner;
