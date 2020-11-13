export default async (req, res) => {
  // try {
  //   const locationData = await fetch('https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02');
  //   res.status(200).json(locationData);
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
  res.send(`Hello!`)
};
