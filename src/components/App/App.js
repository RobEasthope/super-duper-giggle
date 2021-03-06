/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Flex, Box } from 'reflexbox';

import { Styles } from './Styles';

import { kelvinToCelcius } from '../../utils/kelvinToCelcius';

function App() {
  // Set state
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Should *not* be set in code but it's technical test with own key that'll be deleted next week
  const OPEN_WEATHER_API_KEY = '';

  const handlePermissionsClick = () => {
    // Set to true to remove UI
    setGeoLocationPermission(true);

    // Check to see if geolocation functionality is available first
    if ('geolocation' in navigator) {
      // Get location and asave to app state
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({ lat: position.coords.latitude, long: position.coords.longitude });
      });
    } else {
      // Log any errors
      console.log('Geo location unavailable');
    }
  };

  // Get weather automatically once the weather data has been pulled down (saves having to click the button again during dev as well)
  useEffect(() => {
    if (geoLocation) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.long}&appid=${OPEN_WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Save data to state
          setWeatherData(data);
        })
        .catch((error) => {
          // Log any errors
          console.error('Error:', error);
        });
    }
  }, [geoLocation]);

  return (
    // Component specific styles (bit reduntant in this but habits...)
    <Styles temperature={kelvinToCelcius(weatherData?.main?.temp) || null}>
      {/* Rebass styles primative to centre content */}
      <Flex width={1} className="wrapper">
        {/* Permissions messaging requiring a manual button click each time (should be linked to Geolocation permissions but time is short) */}
        {!geoLocationPermission && (
          <Box>
            <p>
              This app uses the Geolocation API built into your browser. Are you happy to grant the necessary
              permissions to use it?
            </p>
            <button type="button" onClick={handlePermissionsClick}>
              Allow
            </button>
          </Box>
        )}

        {/* Loading messaging */}
        {geoLocationPermission && !weatherData && (
          <>
            <Box width={1}>Loading location & weather data</Box>
          </>
        )}

        {/* Show weather icon */}
        {weatherData?.weather && weatherData?.main && (
          <Box width={1}>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png` || null}
              className="weather-icon"
              alt={weatherData?.weather[0]?.main || ''}
            />
            <h2>{kelvinToCelcius(weatherData?.main?.temp)}°C</h2>
          </Box>
        )}
      </Flex>
    </Styles>
  );
}

export default App;
