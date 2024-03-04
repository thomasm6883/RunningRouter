import React from 'react';
import { Button, Card } from 'flowbite-react';
import Drawer from './Drawer.jsx';
import FormDeleteRoute from './routeForms/FormDeleteRoute.jsx';
import FormSaveRoute from './routeForms/FormSaveRoute.jsx';
import MapContext from './mapComponents/MapContext.jsx';

import * as ol from 'ol';
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'

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

  const [showRoute, setShowRoute] = React.useState(null);

  const { map } = React.useContext(MapContext);
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
    console.log("OL Route Draw State: ", showRoute);
    // Show the route on the map and erase the previous route
    if (showRoute) {
      map.removeLayer(showRoute);
    }
    const route = routes[routeIndex].route;
    const points = []; // Convert each point object with lat and lng to an array
    for (let i = 0; i < route.length; i++) {
      console.log("Route Point: ", route[i]);
      console.log("Route Point Lat: ", route[i].Lat);
      console.log("Route Point Lng: ", route[i].Lng);
      points.push([route[i].Lat, route[i].Lng]);
    }

    console.log("Points: ", points);

    for (let i = 0; i < points.length; i++) {
        points[i] = olProj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
    }
    console.log("Points: ", points);
    const featureLine = new ol.Feature({
        geometry: new olGeom.LineString(points)
    });

    const vectorLine = new olSource.Vector({});
    vectorLine.addFeature(featureLine);

    const Route = new olLayer.Vector({
        source: vectorLine,
        style: new olStyle.Style({
            fill: new olStyle.Fill({ color: 'red', weight: 4 }),
            stroke: new olStyle.Stroke({ color: 'red', width: 2 })
        })
    });
    map.addLayer(Route);
    setShowRoute(Route);
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

  handleCloseBar = () => {
    map.removeLayer(showRoute);
    setShowBar(false)

  }
  return (
    <>
      <Drawer show={showBar} onClose={handleCloseBar} routesType={routesType} >
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
              {(routesType === "Generated Routes") ? <Button onClick={()=>handleSave(index)} color="blue" size="xs" className="m-0">Save</Button> : null}
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
