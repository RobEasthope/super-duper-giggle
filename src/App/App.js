import {useState, useEffect} from 'react';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }, [])

  const handlePermissionsClick = () => {
    setGeoLocationPermission(true);
  }

  return (
    <div>
      {!geoLocationPermission && <button onClick={handlePermissionsClick}>Grant geolocation permission</button>}
      foo
    </div>
  );
}

export default App;
