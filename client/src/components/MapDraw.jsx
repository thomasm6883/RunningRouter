import React from 'react';
import "../styles/Map.css";
import * as ol from 'ol';
import MapContext from "./MapContext";
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'

const MapDraw = () => {
  const { map } = React.useContext(MapContext);
  React.useEffect(() => {

  }, [map]);
  return null;
}
export default MapDraw;
