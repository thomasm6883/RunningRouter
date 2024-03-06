import React from 'react';
import * as olProj from 'ol/proj'
import * as ol from 'ol';
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import { TextInput } from 'flowbite-react';
import MapContext  from './mapComponents/MapContext';

const StartRoute = (props) => {
    [start, setStart] = React.useState(null);
    [oldLayer, setOldLayer] = React.useState(null);
    [transStart, setTransStart] = React.useState(null);
    [doStart, setDoStart] = React.useState(false);
    [address, setAddress] = React.useState(null);
    [coordinateFromFlask, setCoordinateFromFlask] = React.useState(null);
    const { map } = React.useContext(MapContext);
    const startLoc = props.startLoc
    const setStartLoc = props.setStartLoc
    const startAddress = props.startAddress
    const setStartAddress =props.setStartAddress
    const [clicked, setClicked] = React.useState(false);

    // Added functionality to fix the side effect of not removing the on 'click' event listener
    // Now callback is called once per click
    var callback = function(evt) {
      if(doStart != false) {
        points = olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        setTransStart(points)
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
        marker.setStyle(new olStyle.Style({
          image: new olStyle.Circle({
            radius: 3,
            fill: new olStyle.Fill({color: 'red'}),
            stroke: new olStyle.Stroke({
              color: [255,0,0], width: 2
            })
          })
        }))
        setOldLayer(marker)
        map.addLayer(marker)
        setDoStart(false)
      }
    }
  }, [start]);

async function sendStart(e) {
  console.log("Seeing start point ",start)
  console.log("Seeing start point ",address)
  if (start != null) {
    console.log("Start position being sent", start)
    try {
      let result = new FormData()
      result.append('lon', transStart[0])
      result.append('lat', transStart[1])
      result.append('direction', null)
      result.append('mileage', 2)
      const dataBack = await fetch("http://127.0.0.1:5000/overpassGather", {
      method: "POST", // or 'PUT'
      body: result,
    }).then(response => response.json())
    console.log(dataBack)
    if(dataBack != null) {
    window.alert("Was able to send start position")
    } else {
      window.alert("Was not able to send start position")
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }
  else if (start == null && address != null && address.length != 0) {
    console.log("Address being sent", address)
    try {
      let result = new FormData()
      result.append('address', address)
      const dataBack = await fetch("http://127.0.0.1:5000/getCoordinates", {
      method: "POST", // or 'PUT'
      body: result,
    }).then(response => response.json())
    console.log(dataBack[0])
    console.log(dataBack[1])
    if(dataBack != null) {
    let result2 = new FormData()
    result2.append('lon', dataBack[0])
    result2.append('lat', dataBack[1])
    result2.append('direction', null)
    result2.append('mileage', 2)
      const dataBack2 = await fetch("http://127.0.0.1:5000/overpassGather", {
      method: "POST", // or 'PUT'
      body: result2,
    })
    console.log(dataBack2)
    if(dataBack2 != null) {
      window.alert("Was able to send start position")
    } else {
      window.alert("Was not able to send start position")
    }
  } else {
    window.alert("Was not able to get coordinates from the address given")
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
  setStartAddress(dataBack)
  console.log(dataBack)
  setTransStart(dataBack)
} catch (error) {
  console.error('Error:', error);
}
}


  return (
     <div>
    <button onClick={getStart}>Select a Start Position</button>
    <button onClick={clearStart}>Clear Start Position</button> <br />
    <p>Or enter an address for starting location</p>
    <TextInput id="address" type="address" required onChange={(e) => setAddress(e.target.value) /*setStartAddress(e.target.value)*/} onBlur={OutsideTextbox}/>
    <button onClick={sendStart}>Generate Route</button> <br />
    </div>

  )
}
export default StartRoute;
