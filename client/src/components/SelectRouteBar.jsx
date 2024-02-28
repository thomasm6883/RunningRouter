import React from 'react';
import { Button, Card } from 'flowbite-react';
import Drawer from './Drawer.jsx';
import FormDeleteRoute from './routeForms/FormDeleteRoute.jsx';
import FormSaveRoute from './routeForms/FormSaveRoute.jsx';

const customTheme = {
    "root": {
      "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
      "children": "flex h-full flex-col justify-center gap-1 p-2",
      "horizontal": {
        "off": "flex-col",
        "on": "flex-col md:max-w-xl md:flex-row"
      },
      "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
    },
    "img": {
      "base": "",
      "horizontal": {
        "off": "rounded-t-lg",
        "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      }
    }
};

function SelectRouteBar(props) {
  const routes = props.routes;
  const setRoutes = props.setRoutes;
  const showBar = props.showBar;
  const setShowBar = props.setShowBar;
  const routesType = props.routesType;
  const setRoutesType = props.setRoutesType;
  const setShowModal = props.setShowModal;
  const setModalContent = props.setModalContent;

  const tempRoutes = [
    {
      name: "Route 1",
      description: "This is the first route",
    },
    {
      name: "Route 2",
      description: "This is the second route",
    },
    {
      name: "Route 3",
      description: "This is the third route",
    },
  ];
  const tempRoutes2 = [
    {
      route: [
        {lat: 40.7128, lng: -74.0060},
        {lat: 34.0522, lng: -118.2437},
        {lat: 41.8781, lng: -87.6298},
        {lat: 29.7604, lng: -95.3698},
        {lat: 39.9526, lng: -75.1652},
      ]
    },
    {
      route: [
        {lat: 40.7128, lng: -74.0060},
        {lat: 34.0522, lng: -118.2437},
        {lat: 41.8781, lng: -87.6298},
        {lat: 29.7604, lng: -95.3698},
        {lat: 39.9526, lng: -75.1652},
      ]
    },
    {
      route: [
        {lat: 40.7128, lng: -74.0060},
        {lat: 34.0522, lng: -118.2437},
        {lat: 41.8781, lng: -87.6298},
        {lat: 29.7604, lng: -95.3698},
        {lat: 39.9526, lng: -75.1652},
      ]
    },
  ];

  const handlePreview = (routeIndex) => {
    console.log(routes[routeIndex]);
    // Show the route on the map and erase the previous route
  }
  const handleStart = (routeIndex) => {
    console.log("Start "+routes[routeIndex].name);
    // Start the route navigation
  }
  const handleSave = (routeIndex) => {
    console.log("Save "+routes[routeIndex].name);
    // MongoDB Update and return success
    setModalContent(<FormSaveRoute handleClose={()=>setShowModal(false)} route={routes[routeIndex]} />)
    setShowModal(true)
  }
  const handleDelete = (routeIndex) => {
    console.log("Delete "+routes[routeIndex].name);
    // MongoDB FindOneAndUpdate
    if (routesType === 'My Routes') {
    setModalContent(<FormDeleteRoute handleClose={()=>setShowModal(false)} route={routes[routeIndex]} />)
    setShowModal(true)
    } else if (routesType === 'Generated Routes') {
      const newRoutes = [...routes]
      newRoutes.splice(routeIndex, 1)
      setRoutes(newRoutes)
    }
  }

  handleOpenRoutes = () => {
    setShowBar(true);setRoutes(tempRoutes2);setRoutesType('Generated Routes')
  }
  return (
    <>
      <Drawer show={showBar} onClose={() => setShowBar(false)} routesType={routesType} >
        {routes.map((route, index) => {
          return (
            <Card
              key={index}
              theme={customTheme}
              className="max-h-sm p-0 m-0"
            >
              <div onClick={() => handlePreview(index)}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-0 m-0">
                {route.name ?? "Route " + (index+1)}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 p-0 m-0">
                {route.description ?? "No description"}
              </p>
              </div>
              <div className="flex flex-row space-x-1 p-0 m-0">
              <Button onClick={()=>handleStart(index)} color="success" size="xs" className="m-0">Start</Button>
              <Button onClick={()=>handleSave(index)} color="blue" size="xs" className="m-0">Save</Button>
              <Button onClick={()=>handleDelete(index)} color="failure" size="xs" className="m-0">Delete</Button>
              </div>
            </Card>
          );
        })}
      </Drawer>
    </>
  );
}

export default SelectRouteBar;
