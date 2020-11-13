import {useState, useEffect} from 'react';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const OPEN_WEATHER_API_KEY = '1cf032daa82e9bca954d4b5dee8dc6d1';

  useEffect(() => {
    if (geoLocation){
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.long}&appid=${OPEN_WEATHER_API_KEY}`, ).then(response => response.json())
        .then(data => {
          console.log(data);
          setWeatherData(data)
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
        <p>This app uses the Geolocation API built into your browser. Are you happy to grant the necessary permissions to use it?</p>
        <button onClick={handlePermissionsClick}>Allow</button>
        </div>
      }
      {geoLocationPermission && geoLocation && 
        <div>
        {weatherData ? 
          <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt={weatherData?.weather[0]?.main || ''} /> : <div>Loading weather data</div>
          }
        </div>
      }
    </div>
  );
}

export default App;
