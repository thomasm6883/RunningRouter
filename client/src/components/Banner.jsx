import React from 'react';
import BannerMenu from './BannerMenu.jsx';
import Logo from './svgComponents/Logo.jsx';
import '../styles/Banner.css';

const Banner = (props) => {
  const loggedIn = props.loggedIn;
  return (
    <div className="banner">
      <Logo />
      <h1>Running Route App</h1>
      <BannerMenu loggedIn={loggedIn}/>
    </div>
  );
};

export default Banner;
