import {useState, useEffect} from 'react';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState();
  const [geoLocation, setGeoLocation] = useState();

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
      {!geoLocationPermission && <button onClick={handlePermissionsClick}>Grant geolocation permission</button>}
      foo
    </div>
  );
}

export default App;
