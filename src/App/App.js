import {useState, useEffect} from 'react';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }, [])

  const handlePermissionsClick = () => {
    setGeoLocationPermission(true);

    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLocation({ lat: position.coords.latitude, long: position.coords.longitude});
    });
  }

  return (
    <div>
      {!geoLocationPermission && <div>
        <p>This app uses the Geolocation API built into your browser. Are happy to grant the necessary permissions to use it?</p>
        <button onClick={handlePermissionsClick}>Allow</button>
        </div>
      }
      {geoLocation && 
        <div>
          <p>Latitude: {geoLocation?.lat && geoLocation.lat}</p>
          <p>Longitude: {geoLocation?.lat && geoLocation.lat}</p>
        </div>
      }
    </div>
  );
}

export default App;
