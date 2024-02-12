import React from 'react';

const BannerMenu = (props) => {
    const loggedIn = props.loggedIn;
    return (
        <div className="bannerMenu">
            { (loggedIn) ? (<><a aria-label='Your Account'>profile</a></>) : (<><button>Login</button> <button>Register</button></>) }
        </div>
    );
};

export default BannerMenu;
