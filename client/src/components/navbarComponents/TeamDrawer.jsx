import React, { useEffect } from 'react';
import * as olProj from 'ol/proj'
import * as ol from 'ol';
import * as olGeom from 'ol/geom'
import * as olLayer from 'ol/layer'
import * as olSource from 'ol/source'
import * as olStyle from 'ol/style'
import MapContext  from '../mapComponents/MapContext';



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
      setDoStart(false)
    }
    }
}, [hazardPoint]);

var callback = function(evt) {
  if(doStart != false) {
    console.log("Got to the callback")
    points = olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    setHazardPoint(evt.coordinate)
    setHazardPointRef(evt.coordinate)
    console.log("Hazard position", hazardPointRef)
    if(clicked == false) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  }
}
const SelectHazardPoint = () => {
setHazardDescription(prompt("Please enter the description of the hazard. Then click the map where the hazard is located."))
setDoStart(true)
if(map != null) {
  if(clicked == true) {
  map.un('click', callback);
  } else {
    map.on('click', callback);
  }
}

}

if (show == true) {

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
            <button className="text-gray-900 dark:text-white hover:underline" >
                  Get a hazard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



export default TeamDrawer;
// {/* <>
// <title>Running Router About Us</title>
// <meta charSet="UTF-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1" />
// <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
// <link
//   rel="stylesheet"
//   href="https://www.w3schools.com/lib/w3-theme-black.css"
// />
// <link
//   rel="stylesheet"
//   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
// />
// {/* Team Container */}
// <div className="w3-container w3-padding-64 w3-center" id="team">
//   <h2>OUR TEAM</h2>
//   <p>Meet the team - our coding monkeys:</p>
//   <div className="w3-row">
//     <br />
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Matthew Thomas</h3>
//       <p>Product Owner</p>
//     </div>
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Nathan Dreher</h3>
//       <p>Algorithm Guy</p>
//     </div>
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Derek Kedrowski</h3>
//       <p>Mongo Guy</p>
//     </div>
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Livia Selby</h3>
//       <p>Web Dev</p>
//     </div>
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Maxwell Wichern</h3>
//       <p>Web Dev</p>
//     </div>
//     <div className="w3-third">
//       <img
//         src="/w3images/avatar.jpg"
//         alt="Boss"
//         style={{ width: "45%" }}
//         className="w3-circle"
//       />
//       <h3>Luke Petrasko</h3>
//       <p>Web Dev</p>
//     </div>
//   </div>
// </div>
// {/* Contact Container */}
// <div className="w3-container w3-padding-64 w3-theme-l5" id="contact">
//   <div className="w3-row">
//     <div className="w3-col m5">
//       <div className="w3-padding-16">
//         <span className="w3-xlarge w3-border-teal w3-bottombar">
//           Contact Us
//         </span>
//       </div>
//       <h3>Address</h3>
//       <p>Swing by for a cup of coffee, or whatever.</p>
//       <p>
//         <i className="fa fa-map-marker w3-text-teal w3-xlarge" />
//         &nbsp;&nbsp;Menomonie, WI
//       </p>
//       <p>
//         <i className="fa fa-phone w3-text-teal w3-xlarge" />
//         &nbsp;&nbsp;+01 1234567890
//       </p>
//       <p>
//         <i className="fa fa-envelope-o w3-text-teal w3-xlarge" />
//         &nbsp;&nbsp;info@runningrouter.com
//       </p>
//     </div>
//     <div className="w3-col m7">
//       <form
//         className="w3-container w3-card-4 w3-padding-16 w3-white"
//         action="/action_page.php"
//         target="_blank"
//       >
//         <div className="w3-section">
//           <label>Name</label>
//           <input className="w3-input" type="text" name="Name" required="" />
//         </div>
//         <div className="w3-section">
//           <label>Email</label>
//           <input className="w3-input" type="text" name="Email" required="" />
//         </div>
//         <div className="w3-section">
//           <label>Message</label>
//           <input
//             className="w3-input"
//             type="text"
//             name="Message"
//             required=""
//           />
//         </div>
//         <button type="submit" className="w3-button w3-right w3-theme">
//           Send
//         </button>
//       </form>
//     </div>
//   </div>
// </div>
// {/* Work Row */}
// <div className="w3-row-padding w3-padding-64 w3-theme-l1" id="work">
//   <div className="w3-quarter">
//     <h2>Running Router</h2>
//     <p>
//       Team Running Router is happy to present our application that allows the
//       user to create various routes to run, as well as save the ones that they
//       truly enjoy.
//     </p>
//   </div>
//   <div className="w3-quarter">
//     <div className="w3-card w3-white">
//       <img src="/w3images/snow.jpg" alt="Snow" style={{ width: "100%" }} />
//       <div className="w3-container">
//         <h3>Easy to Start</h3>
//         <h4>Step 1</h4>
//         <p>Click Generate Route</p>
//         <p>Put where you are</p>
//         <p>Add your details</p>
//         <p>And get running!</p>
//       </div>
//     </div>
//   </div>
//   <div className="w3-quarter">
//     <div className="w3-card w3-white">
//       <img
//         src="/w3images/lights.jpg"
//         alt="Lights"
//         style={{ width: "100%" }}
//       />
//       <div className="w3-container">
//         <h3>Easy to Save</h3>
//         <h4>Step 2</h4>
//         <p>Happy with a route?</p>
//         <p>Select "Save Route"</p>
//         <p>Give it a name</p>
//         <p>And you're golden!</p>
//       </div>
//     </div>
//   </div>
//   <div className="w3-quarter">
//     <div className="w3-card w3-white">
//       <img
//         src="/w3images/mountains.jpg"
//         alt="Mountains"
//         style={{ width: "100%" }}
//       />
//       <div className="w3-container">
//         <h3>Easy to Reuse</h3>
//         <h4>Step 3</h4>
//         <p>Log in whenever</p>
//         <p>Reuse saved routes</p>
//         <p>Or go for a new one!</p>
//         <p>As much as you'd like!</p>
//       </div>
//     </div>
//   </div>
// </div>
// {/* Image of location/map */}
// <img
//   src="/w3images/map.jpg"
//   className="w3-image w3-greyscale-min"
//   style={{ width: "100%" }}
// />
// </> */}
