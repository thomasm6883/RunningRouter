import React, { useEffect } from 'react';
import * as olProj from 'ol/proj'
import * as ol from 'ol';
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import MapContext  from '../mapComponents/MapContext';
import {getLocations, saveLocation} from '../../requests/locationRequests.js'
import { distance } from 'ol/coordinate.js';
import { GlobalContext } from '../App.jsx';


function FeatureDrawer({ show, onClose }) {
  const [clicked, setClicked] = React.useState(false);
  const [hazardPoint, setHazardPoint] = React.useState(null);
  const [hazardPointRef, setHazardPointRef] = React.useState(null);
  const [oldLayer, setOldLayer] = React.useState(null);
  const { map } = React.useContext(MapContext);
  const [doStart, setDoStart] = React.useState(false);
  const [hazardDescription, setHazardDescription] = React.useState(null);
  const [showPoints, setShowPoints] = React.useState(false);
  const [getHazardPoints, setGetHazardPoints] = React.useState(null);
  const [pointsLayer, setPointsLayer] = React.useState([]);
  const { loggedIn } = React.useContext(GlobalContext);
  console.log("Logged in", loggedIn)


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
        image: new olStyle.Icon({
          anchor: [0.5, 1],
          scale: 0.01,
          src: 'hazard.png',
        }),
      }))
      // marker.setStyle(styles.icon)
      setOldLayer(marker)
      map.addLayer(marker)

      savePoint()
      setDoStart(false)
    }
    }
}, [hazardPoint]);

async function getHazardLocations(location) {
  try {
  const objectForGetLocation = {
    latitude: location[1],
    longitude: location[0],
    distance : 8
  }
  const response = await getLocations(objectForGetLocation)
  let points = []
  let description = []
  console.log(response)
  for (let i = 0; i < response.length; i++) {
   points.push(olProj.transform([response[i].Location[1], response[i].Location[0]], 'EPSG:4326', 'EPSG:3857'))
   description.push(response[i].Discription)
  }
  console.log("Points", points)
  markerArray = []
  if(points != []) {
    for (let i = 0; i < points.length; i++) {
      console.log("Got to the get hazard points")
      const marker = new olLayer.Vector({
        source: new olSource.Vector({
          features: [
            new ol.Feature({
              geometry: new olGeom.Point(
                points[i]
              )
            })
          ]
        })
      })
      marker.setStyle(
        new olStyle.Style({
          image: new olStyle.Icon({
            anchor: [0.5, 1],
            scale: 0.01,
            src: 'hazard.png',
          }),
          text: new olStyle.Text({
            text: description[i],
            fill: new olStyle.Fill({color: 'black'}),
            stroke: new olStyle.Stroke({color: 'white', width: 2}),
            offsetX: 10,
            offsetY: -10,
          })
        }),
      )
      // Create a new style for the hover effect
      markerArray.push(marker)
      map.addLayer(marker)
      // Add a pointermove event listener to the map



  }
  }
  setPointsLayer(markerArray)
} catch (err) {
  console.error('Failed to get hazard locations')
  console.error(err)
}
}

useEffect(() => {
  if(showPoints == true) {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = [position.coords.longitude, position.coords.latitude]
      getHazardLocations(location)
    },
    (error) => {
      console.log(error)
      alert("Please enable location services to get hazard locations")
    })
  } else {
    if(pointsLayer != []) {
      for (let i = 0; i < pointsLayer.length; i++) {
        map.removeLayer(pointsLayer[i])
      }
    }
  }

}, [showPoints])

async function savePoint() {
  try {
    const testing = prompt("Please enter the description of the hazard. Then click the map where the hazard is located.")
    console.log(testing)
    const save = {
      Location: [hazardPointRef[1], hazardPointRef[0]],
      Discription: testing,
      LocationType: "Hazard"
    }
    const response = await saveLocation(save)
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
setShowPoints(true)
}

function hindHazards() {
  setShowPoints(false)
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
            {(showPoints == false) ? <button className="text-gray-900 dark:text-white hover:underline" onClick={showHazards}>
                  Show a hazard
            </button> :
            <button className="text-gray-900 dark:text-white hover:underline" onClick={hindHazards}>
                  Hide a hazard
            </button>
            }
          </div>
        </div>
      </section>
    </div>
  );
}



export default FeatureDrawer;
