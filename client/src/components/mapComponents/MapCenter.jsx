import React from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import MapContext from "./MapContext";
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'

const MapCenter = (props) => {
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      if (props.map != null) {
        props.map.getView().setCenter(olProj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
        props.map.getView().setZoom(15);
        console.log("Center point",olProj.transform(props.map.getView().getCenter(),
        props.map.getView().getProjection(),
        'EPSG:4326'));
      }
      })

    // const marker = new olLayer.Vector({
    //   source: new olSource.Vector({
    //     features: [
    //       new ol.Feature({
    //         geometry: new olGeom.Point(
    //           olProj.fromLonLat([longitude, latitude])
    //         )
    //       })
    //     ]
    //   })
    // })
    // marker.setStyle(new olStyle.Style({
    //   image: new olStyle.Circle({
    //     radius: 3,
    //     fill: new olStyle.Fill({color: 'red'}),
    //     stroke: new olStyle.Stroke({
    //       color: [255,0,0], width: 2
    //     })
    //   })
    // }))
    //map.addLayer(marker);

}, [props.map]);
return null;
}

export default MapCenter;
