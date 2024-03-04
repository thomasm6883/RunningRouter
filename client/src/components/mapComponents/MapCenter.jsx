import React from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import MapContext from './MapContext.jsx'
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'


const MapCenter = () => {
  const { map } = React.useContext(MapContext);
  React.useEffect(() => {

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    map.getView().setCenter(olProj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(15);
    console.log("Center point",olProj.transform(map.getView().getCenter(),
    map.getView().getProjection(),
    'EPSG:4326'));

  })
}, [map]);
return null;
}

export default MapCenter;
