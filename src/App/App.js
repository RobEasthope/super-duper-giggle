import {useState, useEffect} from 'react';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);

  useEffect(() => {
    if (geoLocation){
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: geoLocation.lat,
          long: geoLocation.long,
        }),
      };
      
      fetch(`/api/getLocationData`, payload).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [geoLocation])

  const handlePermissionsClick = () => {
    setGeoLocationPermission(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({ lat: position.coords.latitude, long: position.coords.longitude });
      });
    } else {
      console.log("Geo location Available");
    }
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
          <p>Longitude: {geoLocation?.long && geoLocation.long}</p>
        </div>
      }
    </div>
  );
}

export default App;
