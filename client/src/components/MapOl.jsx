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

const MapOl = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({
        center: [0, 0],
        zoom: 5,
        }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
    };
    let mapObject = new ol.Map(options);



navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  mapObject.getView().setCenter(olProj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
  mapObject.getView().setZoom(15);
  console.log("Center point",olProj.transform(mapObject.getView().getCenter(),
  mapObject.getView().getProjection(),
  'EPSG:4326'));

  const marker = new olLayer.Vector({
    source: new olSource.Vector({
      features: [
        new ol.Feature({
          geometry: new olGeom.Point(
            olProj.fromLonLat([longitude, latitude])
          )
        })
      ]
    })
  })
  marker.setStyle(new olStyle.Style({
    image: new olStyle.Circle({
      radius: 3,
      fill: new olStyle.Fill({color: 'red'}),
      stroke: new olStyle.Stroke({
        color: [255,0,0], width: 2
      })
    })
  }))
  mapObject.addLayer(marker);
});
  mapObject.setTarget(mapRef.current);
  setMap(mapObject);
  return () => mapObject.setTarget(undefined);
  }, []);

    return (
      <MapContext.Provider value={{ map }}>
        <div ref={mapRef} className="ol-map">

        </div>
    </MapContext.Provider>
    );
};

export default MapOl;
