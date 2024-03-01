import React from 'react';
import { useState, useRef, useEffect } from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import MapContext from './MapContext';

const MapCreate = (props) => {
  const mapRef = useRef();

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

      props.setMap(mapObject);

      return () => mapObject.setTarget(undefined);
  }, []);
  return (
    <div ref={mapRef} className="ol-map">

    </div>
  )
};

export default MapCreate;
