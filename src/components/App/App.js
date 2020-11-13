/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Flex, Box } from 'reflexbox';

import { Styles } from './Styles';

function App() {
  // Set state
  const [geoLocationPermission, setGeoLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Should *not* be set in code but it's technical test with own key that'll be deleted next week
  const OPEN_WEATHER_API_KEY = '1cf032daa82e9bca954d4b5dee8dc6d1';

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
    <Styles temperature={weatherData?.main?.temp || null}>
      {/* Rebass styles primative to centre content */}
      <Flex className="wrapper">
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
        {/* Show weather icon and loading messaging */}
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
