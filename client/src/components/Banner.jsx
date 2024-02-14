import React from 'react';
//import logo from '../assets/logo.svg';
import BannerMenu from './BannerMenu.jsx';
import Logo from './svgComponents/Logo.jsx';
import '../styles/Banner.css';
import { Navbar } from 'flowbite-react';

const Banner = (props) => {
  const loggedIn = props.loggedIn;
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <Logo className="pr-1"/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Running Router
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <BannerMenu {...props} />

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Routes</Navbar.Link>
        <Navbar.Link href="#">Get PRO</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Banner;
