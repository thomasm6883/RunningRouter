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

const MapOl = ({ children }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
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
        { children }
        </div>
      </MapContext.Provider>
    );
};

export default MapOl;
