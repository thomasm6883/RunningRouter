import React from 'react';
import { useRef, useEffect } from 'react';
import "../../styles/Map.css";
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import MapContext from './MapContext';
import OlZoom from 'ol/control/Zoom';
import { Attribution } from 'ol/control.js';
import MapControlRecenter from './MapControlRecenter';

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
        new MapControlRecenter()
      ],
    };
    let mapObject = new ol.Map(options);

      mapObject.setTarget(mapRef.current);

      setMap(mapObject);
      return () => mapObject.setTarget(undefined);
  }, []);

    return (
        <div ref={mapRef} className="h-full grow">
        { children }
        </div>
    );
};

export default MapCreate;
