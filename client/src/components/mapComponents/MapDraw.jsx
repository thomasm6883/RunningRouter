import React from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import MapContext from "./MapContext";
import * as olProj from 'ol/proj'
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'

const MapDraw = (props) => {
  React.useEffect(() => {
    if(props.map != null) {
    var points = [ [-91.8190679, 44.9387964], [-91.8216535, 44.9370465], [-91.8231998, 44.9359751], [-91.8254536,44.9359751], [-91.83548664,44.9180967], [-91.8459916,44.9077989] ];

    for (var i = 0; i < points.length; i++) {
        points[i] = olProj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
        console.log(points[i])
      }

    var featureLine = new ol.Feature({
        geometry: new olGeom.LineString(points)
    });

    var vectorLine = new olSource.Vector({});
    vectorLine.addFeature(featureLine);

    var vectorLineLayer = new olLayer.Vector({
        source: vectorLine,
        style: new olStyle.Style({
            fill: new olStyle.Fill({ color: 'red', weight: 4 }),
            stroke: new olStyle.Stroke({ color: 'red', width: 2 })
        })
    });
    props.map.addLayer(vectorLineLayer);
  }
  }, [props.map]);
}
export default MapDraw;
