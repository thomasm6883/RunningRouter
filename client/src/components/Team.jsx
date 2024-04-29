import React from 'react'

function Team() {

  const people = [
    { name: 'Matthew Thomas', position: 'Product Owner', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    { name: 'Nathan Dreher', position: 'Algorithm Guy', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    { name: 'Derek Kedrowski', position: 'MongoDB Guy', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    { name: 'Livia Selby', position: 'Mapmaker', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    { name: 'Maxwell Wichern', position: 'Made This Page', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    { name: 'Luke Petrasko', position: 'Money Man', image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
  ];


  return (
<>
  <title>Running Router About Us</title>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://www.w3schools.com/lib/w3-theme-black.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="w3-top">
  <div class="w3-bar w3-black">
    <a href="/" class="w3-bar-item w3-button">Back</a>
  </div>
  </div>
  {/* Work Row */}
  <div className="w3-row-padding w3-padding-64 w3-theme-l1" id="work" style={{backgroundImage: `url("https://www.w3schools.com/w3css/map.jpg")`}}>
    <div className="w3-quarter w3-white">
      <h2 style={{ color: 'black' }}>Running Router</h2>
      <p style={{ color: 'black' }}>
        Team Running Router is happy to present our application that allows the
        user to create various routes to run, as well as save the ones that they
        truly enjoy.
      </p>
      <br />
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img src="https://www.w3schools.com/w3images/snow.jpg" alt="Snow" style={{ width: "100%" }} />
        <div className="w3-container">
          <h3>Easy to Start</h3>
          <h4>Step 1</h4>
          <p>Click Generate Route</p>
          <p>Put where you are</p>
          <p>Add your details</p>
          <p>And get running!</p>
          <br />
        </div>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img
          src="https://www.w3schools.com/w3images/lights.jpg"
          alt="Lights"
          style={{ width: "100%" }}
        />
        <div className="w3-container">
          <h3>Easy to Save</h3>
          <h4>Step 2</h4>
          <p>Happy with a route?</p>
          <p>Select "Save Route"</p>
          <p>Give it a name</p>
          <p>And you're golden!</p>
          <br />
        </div>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img
          src="https://www.w3schools.com/w3images/mountains.jpg"
          alt="Mountains"
          style={{ width: "100%" }}
        />
        <div className="w3-container">
          <h3>Easy to Reuse</h3>
          <h4>Step 3</h4>
          <p>Log in whenever</p>
          <p>Reuse saved routes</p>
          <p>Or go for a new one!</p>
          <p>As much as you'd like!</p>
          <br />
        </div>
      </div>
    </div>
  </div>
  <div style={{ backgroundColor: '#333', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px', color: '#fff' }}>Meet the Team!</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {people.map((person, index) => (
          <div key={index} style={{ flex: '0 0 33.333%', padding: '10px', textAlign: 'center' }}>
            <div style={{ maxWidth: '200px', margin: '0 auto' }}>
              <img src={person.image} alt={person.name} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div>
              <h2 style={{ color: '#fff' }}>{person.name}</h2>
              <p style={{ color: '#fff' }}>{person.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
</>

  )
}

export default Team
