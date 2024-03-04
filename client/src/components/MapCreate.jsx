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
  const { map, setMap } = React.useContext(MapContext);
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
        new Attribution({ collapsible: false }),
      ],
    };
    let mapObject = new ol.Map(options);

      mapObject.setTarget(mapRef.current);

      setMap(mapObject);
      return () => mapObject.setTarget(undefined);
  }, []);

    return (
        <div ref={mapRef} className="ol-map">
        { children }
        </div>
    );
};

export default MapCreate;
