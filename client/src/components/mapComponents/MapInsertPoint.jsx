import React from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import MapContext from "./MapContext";
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'

const MapInsertPoint = (props) => {
  React.useEffect(() => {
    console.log("Got to the insert point compodent")
    if(props.coordinate != null) {
    console.log("Got inside the insert point compodent")
    const marker = new olLayer.Vector({
      source: new olSource.Vector({
        features: [
          new ol.Feature({
            geometry: new olGeom.Point(
              olProj.fromLonLat(coordinate)
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
    props.map.addLayer(marker);
  }
}, [props.map]);
return null;
}

export default MapInsertPoint;
