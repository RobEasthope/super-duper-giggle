/* eslint-disable import/no-anonymous-default-export */
import { fetchApiData} from '../src/utils/fetchApiData';

export default async (req, res) => {
  try {
    const locationData = await fetchApiData('https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02');
    res.status(200).json(locationData);
    console.log(JSON.parse(locationData));

  } catch (error) {
    res.status(500).json({ error });
  }
};
