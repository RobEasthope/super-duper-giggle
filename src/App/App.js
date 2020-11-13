/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Flex, Box } from 'reflexbox';

import { Styles } from './Styles';

function App() {
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const OPEN_WEATHER_API_KEY = '1cf032daa82e9bca954d4b5dee8dc6d1';

  const handlePermissionsClick = () => {
    setGeoLocationPermission(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({ lat: position.coords.latitude, long: position.coords.longitude });
      });
    } else {
      console.log('Geo location unavailable');
    }
  };

  useEffect(() => {
    if (geoLocation) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.long}&appid=${OPEN_WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error:', error);
        });
    }
  }, [geoLocation]);

  return (
    <Styles temperature={weatherData?.main?.temp}>
      <Flex className="wrapper" alignItems="center">
        {!geoLocationPermission && (
          <Box className="permissions-msg">
            <p>
              This app uses the Geolocation API built into your browser. Are you happy to grant the necessary
              permissions to use it?
            </p>
            <button type="button" onClick={handlePermissionsClick}>
              Allow
            </button>
          </Box>
        )}
        {geoLocationPermission && geoLocation && (
          <>
            {weatherData ? (
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                className="weather-icon"
                alt={weatherData?.weather[0]?.main || ''}
              />
            ) : (
              <Box>Loading weather data</Box>
            )}
          </>
        )}
      </Flex>
    </Styles>
  );
}

export default App;
