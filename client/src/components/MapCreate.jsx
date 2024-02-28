import React from 'react';
import { useState, useRef, useEffect } from 'react';
import "../styles/Map.css";
import {Map, View, } from 'ol';
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import MapContext from './MapContext';
import OlZoom from 'ol/control/Zoom';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { Attribution } from 'ol/control.js';
import { boundingExtent } from 'ol/extent';

const MapCreate = ({ children }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState([0, 0]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(olProj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
      //olProj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
      console.log("User Location: ", userLocation);
    });

  }, []);
  //setUserLocation([0, 0]);
  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({
        center: [-10076532.406576514, 5571695.929704119],
        zoom: 5,
        }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      controls: [
        new OlZoom({ className: 'custom-zoom' }),
        new ZoomToExtent({
          extent: [userLocation[0], userLocation[1], userLocation[0]+500000, userLocation[1]+500000],//boundingExtent(userLocation),
          className: 'custom-zoom-extent',
          tipLabel: 'Re-center',
          label: 'Re-center',

        }),
        new Attribution({ collapsible: false }),
      ],
    };
    let mapObject = new ol.Map(options);

      mapObject.setTarget(mapRef.current);

      setMap(mapObject);
      return () => mapObject.setTarget(undefined);
  }, []);

    return (
      <MapContext.Provider value={{ map }}>
        <div ref={mapRef} className="ol-map">
        { children }
        </div>
      </MapContext.Provider>
    );
};

export default MapCreate;
