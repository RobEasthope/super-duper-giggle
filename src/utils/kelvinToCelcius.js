export function kelvinToCelcius(kelvin) {
  // Convert Open weather API data to celcisu and round down§
  return Math.round(kelvin - 273.15);
}
