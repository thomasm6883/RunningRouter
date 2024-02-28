import React from 'react';
//import logo from '../assets/logo.svg';
import BannerMenu from './BannerMenu.jsx';
import Logo from './svgComponents/Logo.jsx';
import '../styles/Banner.css';
import { Navbar } from 'flowbite-react';
//import '../styles/Logo.css';

const Banner = (props) => {
  return (
    <Navbar className="banner" fluid rounded >
      <Navbar.Brand>
        <Logo className="pr-1 sm:smallLogo md:largeLogo"/>
        <span className="self-center whitespace-nowrap ml-2 md:text-3xl font-semibold dark:text-white">
          Running Router
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <BannerMenu {...props} />
      </div>
    </Navbar>
  );
};

export default Banner;
