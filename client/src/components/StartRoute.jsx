import React from 'react';
import * as olProj from 'ol/proj'
import * as ol from 'ol';
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import { TextInput } from 'flowbite-react';
import MapContext  from './mapComponents/MapContext';
import { GlobalContext } from './App';

const StartRoute = (props) => {
    [start, setStart] = React.useState(null);
    [oldLayer, setOldLayer] = React.useState(null);
    [doStart, setDoStart] = React.useState(false);
    [address, setAddress] = React.useState(null);
    const { map } = React.useContext(MapContext);
    const { startLoc, setStartLoc, setLength, length, setShowBar, setRoutes, setShowGenerateRouteDrawer, setName} = React.useContext(GlobalContext);
    const [clicked, setClicked] = React.useState(false);
    const [userLength, setUserLength] = React.useState(0);

    // Added functionality to fix the side effect of not removing the on 'click' event listener
    // Now callback is called once per click
    var callback = function(evt) {
      if(doStart != false) {
        points = olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        setStartLoc(points)
        setStart(evt.coordinate)
        console.log("Start position", points)
        if(clicked == false) {
          setClicked(true)
        } else {
          setClicked(false)
        }
      }
    }
    const getStart = () => {
    setDoStart(true)
    if(map != null) {
      map.on('click', callback);
      if(clicked == true) {
      map.un('click', callback);
      }
    }
    }


    React.useEffect(() => {
      if(doStart != false) {
        if(start != null) {
          if(oldLayer != null) {
            map.removeLayer(oldLayer)
          }
        const marker = new olLayer.Vector({
          source: new olSource.Vector({
            features: [
              new ol.Feature({
                geometry: new olGeom.Point(
                  start
                )
              })
            ]
          })
        })
        const styles = {
          'icon': new olStyle.Style({
            image: new olStyle.Icon({
              anchor: [0.5, 1],
              scale: 0.03,
              src: 'marker.png',
            }),
          }),

        };
        marker.setStyle(styles.icon)
        setOldLayer(marker)
        map.addLayer(marker)
        setDoStart(false)
      }
    }
  }, [start]);

async function sendStart(e) {
  console.log("Seeing start point ",start)
  if (start != null && userLength != null) {
    console.log("Start position being sent", startLoc)
    try {
      let result = new FormData()
      result.append('lon', startLoc[0])
      result.append('lat', startLoc[1])
      result.append('direction', userLength)
      result.append('mileage', userLength)
      const dataBack = await fetch("http://127.0.0.1:5000/overpassGather", {
      method: "POST", // or 'PUT'
      body: result,
    }).then(response => response.json())
    console.log(dataBack)
    console.log("length response", dataBack.length)
    console.log("coordinates response", dataBack.coordinates)
    if(dataBack != null) {
      setShowBar(true);
      setRoutes(dataBack.coordinates);
      setLength(dataBack.length)
      setName(null)
      map.removeLayer(oldLayer)
      setShowGenerateRouteDrawer(false)
    } else {
      window.alert("Was not able to generate a route with that Start location")
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }
  else {
    alert("Please select a starting point")
  }
}
function clearStart() {
  map.removeLayer(oldLayer)
  setStart(null)
}

async function OutsideTextbox() {
  try {
    let result = new FormData()
    result.append('address', address)
    const dataBack = await fetch("http://127.0.0.1:5000/getCoordinates", {
    method: "POST", // or 'PUT'
    body: result,
  }).then(response => response.json())
  console.log("Return data from text box",dataBack)
  if(dataBack != null){
  setStartLoc([dataBack[1], dataBack[0]])
  const transformedDataBack = olProj.transform([dataBack[1], dataBack[0]], 'EPSG:4326', 'EPSG:3857');
  setDoStart(true)
  setStart(transformedDataBack)
  } else {
    alert("Could not use that start location. Please select a different Start Location")
  }
} catch (error) {
  console.error('Error:', error);
}
}
  return (
    <div className="flex flex-col md:flex-row w-full ">
      <div>
      <div id="startSelect" className='flex flex-row justify-center items-center space-x-2'>
        <div className='font-bold py-auto'>Start:</div>
        <button id="selectStartButton" onClick={getStart}><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
        </button>
        <button id="clearStartButton" onClick={clearStart}>Clear</button>
        <TextInput
          id="address"
          type="address"
          placeholder='Or enter an address'
          required
          onChange={
            (e) =>
              setAddress(e.target.value) /*setStartAddress(e.target.value)*/
          }
          onBlur={OutsideTextbox}
        />
      </div>
      <div id="startEnd" className='flex flex-row justify-center items-center space-x-2'>
        <div className='font-bold py-auto'>End:</div>
        <button id="selectStartButton" onClick={getStart}><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
        </button>
        <button id="clearStartButton" onClick={clearStart}>Clear</button>
        <TextInput
          id="address"
          type="address"
          placeholder='Or enter an address'
          required
          onChange={
            (e) =>
              setAddress(e.target.value) /*setStartAddress(e.target.value)*/
          }
          onBlur={OutsideTextbox}
        />
      </div>
      </div>
      <div className='ml-3'>
        <label>Distance</label>
        <input type="text" id="distance" name="distance" onChange={(e) => setUserLength(e.target.value)}/>
      </div>
      <button className="ml-auto justify-right px-2 rounded border-2" onClick={sendStart}>
        Generate Route
      </button>{" "}
      <br />
    </div>
  );
}
export default StartRoute;
