import React from 'react';
import logo from '../assets/logo.svg';
import BannerMenu from './BannerMenu.jsx';

const Banner = () => {
    return (
        <div className="banner">
            <img src={logo} alt="Website Icon"/>
            <h1>Running Route App</h1>
            <BannerMenu />
        </div>
    );
};

export default Banner;