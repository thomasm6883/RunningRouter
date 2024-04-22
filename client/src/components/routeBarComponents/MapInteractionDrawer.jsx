import React from 'react';
import { GlobalContext } from '../App.jsx';

const MapInteractionDrawer = () => {
  const { showBar, routes } = React.useContext(GlobalContext);

  return (
    // Your JSX code goes here
    <div>
      {(showBar) ? console.log("Drawer is true") : console.log("Drawer is false")}

    </div>
  );
};

export default MapInteractionDrawer;
