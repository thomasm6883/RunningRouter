import React from 'react';
import { Button, Card } from 'flowbite-react';
import Drawer from './Drawer.jsx';
import FormDeleteRoute from './routeForms/FormDeleteRoute.jsx';
import FormSaveRoute from './routeForms/FormSaveRoute.jsx';
import MapContext from './mapComponents/MapContext.jsx';

import * as ol from 'ol';
import * as olExtent from 'ol/extent';
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import {getVectorContext} from 'ol/render.js';
import { set } from 'ol/transform.js';

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
  const setShowModal = props.setShowModal;
  const setModalContent = props.setModalContent;

  const [showRoutePreview, setShowRoutePreview] = React.useState(null);
  const [animationLayer, setAnimationLayer] = React.useState(null);
  const [startRoute, setStartRoute] = React.useState(false);

  const { map } = React.useContext(MapContext);

  const handlePreview = (routeIndex) => {
    // Show the route on the map and erase the previous route
    if (showRoutePreview) {
      map.removeLayer(showRoutePreview);
      setShowRoutePreview(null);
    }
    if (animationLayer) {map.removeLayer(animationLayer); setAnimationLayer(null);}
    const route = routes[routeIndex].route;
    const points = []; // Convert each point object with lat and lng to an array

    for (let i = 0; i < route.length; i++) {
      points.push([route[i].Lat, route[i].Lng]);
    }
    let maxLat, minLat, maxLng, minLng;
    for (let i = 0; i < points.length; i++) {
        points[i] = olProj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
        if(i === 0) {
          maxLat = points[i].Lat;
          minLat = points[i].Lat;
          maxLng = points[i].Lng;
          minLng = points[i].Lng;
        } else {
          if(points[i].Lat > maxLat) {
            maxLat = points[i].Lat;
          }
          if(points[i].Lat < minLat) {
            minLat = points[i].Lat;
          }
          if(points[i].Lng > maxLng) {
            maxLng = points[i].Lng;
          }
          if(points[i].Lng < minLng) {
            minLng = points[i].Lng;
          }
        }
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
            fill: new olStyle.Fill({ color: 'red', weight: 6 }),
            stroke: new olStyle.Stroke({ color: [0, 0, 200, 0.4], width: 6 })
        })
    });
    map.addLayer(Route);
    // Set the map zoom
    const extent = olExtent.boundingExtent(points);
    map.getView().fit(extent, { padding: [90, 75, 170, 75] });
    setShowRoutePreview(Route);
  }
  const handleStart = (routeIndex) => {
    setStartRoute(true);

    if (showRoutePreview) {
      map.removeLayer(showRoutePreview);
    }
    // Get the route points ---------------------------------------------------
    const route = routes[routeIndex].route;
    const points = []; // Convert each point object with lat and lng to an array

    for (let i = 0; i < route.length; i++) {
      points.push([route[i].Lat, route[i].Lng]);
    }
    let maxLat, minLat, maxLng, minLng;
    for (let i = 0; i < points.length; i++) {
      points[i] = olProj.transform(points[i], "EPSG:4326", "EPSG:3857");
      if (i === 0) {
        maxLat = points[i].Lat;
        minLat = points[i].Lat;
        maxLng = points[i].Lng;
        minLng = points[i].Lng;
      } else {
        if (points[i].Lat > maxLat) {
          maxLat = points[i].Lat;
        }
        if (points[i].Lat < minLat) {
          minLat = points[i].Lat;
        }
        if (points[i].Lng > maxLng) {
          maxLng = points[i].Lng;
        }
        if (points[i].Lng < minLng) {
          minLng = points[i].Lng;
        }
      }
    }
    // Create the route line ---------------------------------------------------
    const lineString = new olGeom.LineString(points);
    const featureLine = new ol.Feature({
      type: "route",
      geometry: lineString,
    });
    const startMarker = new ol.Feature({
      type: "icon",
      geometry: new olGeom.Point(lineString.getFirstCoordinate()),
    });
    const endMarker = new ol.Feature({
      type: "icon",
      geometry: new olGeom.Point(lineString.getLastCoordinate()),
    });
    const position = startMarker.getGeometry().clone();
    const geoMarker = new ol.Feature({
      type: "geoMarker",
      geometry: position,
    });

    const styles = {
      'route': new olStyle.Style({
        stroke: new olStyle.Stroke({
          width: 6,
          color: [50, 50, 200, 0.7],
        }),
      }),
      'icon': new olStyle.Style({
        image: new olStyle.Icon({
          anchor: [0.5, 1],
          scale: 0.04,
          src: 'marker.png',
        }),
      }),
      'geoMarker': new olStyle.Style({
        // image: new olStyle.Icon({
        //   anchor: [0.5, 0.5],
        //   scale: 1,
        //   src: 'logo.svg',
        //   })
        image: new olStyle.Circle({
          radius: 7,
          fill: new olStyle.Fill({ color: 'black' }),
          stroke: new olStyle.Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      }),
    };
    const routeLayer = new olLayer.Vector({
      source: new olSource.Vector({
        features: [featureLine, startMarker, endMarker, geoMarker],
      }),
      style: function (feature) {
        // hide geoMarker if animation is active
        return styles[feature.get('type')];
      },
    });
    map.addLayer(routeLayer);
    setAnimationLayer(routeLayer);
    const extent = olExtent.boundingExtent(points);
    map.getView().fit(extent, { padding: [90, 75, 170, 75] });
    // Start the route navigation ---------------------------------------------

    const speed = 60; // will be input by the user and passed as a state variable
    // start and stop animation
    let animating = false;
    let distance = 0;
    let lastTime;

    const moveFeature = (event) => {
      const time = event.frameState.time;
      const elapsedTime = time - lastTime;
      distance = (distance + (speed * elapsedTime) / 1e6) % 2;
      lastTime = time;

      function setDistance(distance) {
        if (distance > 1) {
          stopAnimation();
          return 1;
        } else {
          return distance;
        }
      }
      const currentCoordinate = lineString.getCoordinateAt(
        setDistance(distance), // 2 - distance
      );
      position.setCoordinates(currentCoordinate);
      const vectorContext = getVectorContext(event);
      vectorContext.setStyle(styles.geoMarker);
      vectorContext.drawGeometry(position);
      // tell OpenLayers to continue the postrender animation
      map.render();
    }
    function startAnimation() {
      animating = true;
      lastTime = Date.now();
      // set animating boolean variable to true
      routeLayer.on('postrender', moveFeature);

      geoMarker.setGeometry(null); // this is necessary for the openlayers example, but might not be necessary for our implementation
    }
    startAnimation();

    function stopAnimation() {
      animating = false;
      // set animating boolean variable to false
      routeLayer.un('postrender', moveFeature);
      //setStartRoute(false);
    }

  };
  const handleStop = (routeIndex) => {
    console.log("Stop "+routes[routeIndex].name);
    // Stop the route navigation
    console.log(map.getLayers().getArray());
    map.removeLayer(animationLayer);
    setStartRoute(false);
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
    if (animationLayer) {map.removeLayer(animationLayer); setAnimationLayer(null);}
    if (showRoutePreview) {map.removeLayer(showRoutePreview); setShowRoutePreview(null);}
    setStartRoute(false)
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
              {(!startRoute) ? <Button onClick={()=>handleStart(index)} color="success" size="xs" className="m-0">Start</Button> : <Button onClick={()=>handleStop(index)} color="success" size="xs" className="m-0">Stop</Button> }
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
