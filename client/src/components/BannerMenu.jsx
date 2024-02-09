import React from 'react';

const BannerMenu = () => {
    return (
        <div className="bannerMenu">
            { (loggedIn) ? (<><button>Login</button> <button>Register</button></>) : (<><button></button><button className='logoutButton'>Logout</button></>) }
        </div>
    );
};

export default BannerMenu;