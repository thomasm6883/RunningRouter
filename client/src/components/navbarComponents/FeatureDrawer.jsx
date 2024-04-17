import React, { useEffect } from 'react';
import * as olProj from 'ol/proj'
import * as ol from 'ol';
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import MapContext  from '../mapComponents/MapContext';
import {getLocations, saveLocation} from '../../requests/locationRequests.js'


function TeamDrawer({ show, onClose }) {
  const [clicked, setClicked] = React.useState(false);
  const [hazardPoint, setHazardPoint] = React.useState(null);
  const [hazardPointRef, setHazardPointRef] = React.useState(null);
  const [oldLayer, setOldLayer] = React.useState(null);
  const { map } = React.useContext(MapContext);
  const [doStart, setDoStart] = React.useState(false);
  const [hazardDescription, setHazardDescription] = React.useState(null);

  React.useEffect(() => {
    if(doStart != false) {
      if(hazardPoint != null) {
        if(oldLayer != null) {
          map.removeLayer(oldLayer)
        }
      const marker = new olLayer.Vector({
        source: new olSource.Vector({
          features: [
            new ol.Feature({
              geometry: new olGeom.Point(
                hazardPoint
              )
            })
          ]
        })
      })
      marker.setStyle(new olStyle.Style({
        image: new olStyle.Circle({
          radius: 5,
          fill: new olStyle.Fill({color: 'yellow'}),
        })
      }))
      // marker.setStyle(styles.icon)
      setOldLayer(marker)
      map.addLayer(marker)
      savePoint()
      setDoStart(false)
    }
    }
}, [hazardPoint]);

async function savePoint() {
  try {
    const save = {
      Location: hazardPoint,
      Description: hazardDescription,
      LocationType: "Hazard"
    }
    const response = saveLocation(save)
    console.log("Save point response", response)
  } catch (err) {
    console.error('Failed to save location')
    console.error(err)
  }
}

var callback = function(evt) {
  if(doStart != false) {
    console.log("Got to the callback")
    points = olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    setHazardPoint(evt.coordinate)
    setHazardPointRef(points)
    console.log("Hazard position", hazardPointRef)
    if(clicked == false) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  }
}
const SelectHazardPoint = () => {
setDoStart(true)
if(map != null) {
  if(clicked == true) {
  map.un('click', callback);
  } else {
    map.on('click', callback);
  }
}
}

function showHazards() {

}

function hindHazards() {

}

  return (
    <div
      className={
        " fixed overflow-y-scroll overflow-x-hidden overscroll-auto z-10 inset-x-0 bottom-0 h-fit" +
        (show
          ? " transition-opacity opacity-100 duration-500 translate-y-0  "
          : " transition-all delay-500 opacity-0 translate-y-fit  ")
      }
    >
      <section
        className={
          " w-screen  bottom-0 bg-white w-full delay-400 duration-500 ease-in-out transition-all transform  " +
          (show ? " translate-y-0 " : " translate-y-fit ")
        }
      >
        <div className="relative w-screen flex flex-col">
          <div className="flex justify-left p-2">
            <button
              className="p-2 ml-auto justify-right"
              onClick={() => {onClose(); setClicked(false); if(oldLayer != null) {map.removeLayer(oldLayer)}}}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col overflow-y-scroll overflow-x-hidden overscroll-auto">
            <button className="text-gray-900 dark:text-white hover:underline" onClick={SelectHazardPoint} >
                  Report a hazard
            </button>
            <button className="text-gray-900 dark:text-white hover:underline" onClick={showHazards}>
                  Show a hazard
            </button>
            <button className="text-gray-900 dark:text-white hover:underline" onClick={hindHazards}>
                  Hind a hazard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



export default TeamDrawer;
