/* eslint-disable import/no-anonymous-default-export */
import { fetchApiData} from '../src/utils/fetchApiData';

export default async (req, res) => {
  console.log(req.body);

  try {
    const locationData = await fetchApiData(`https://www.metaweather.com/api/location/search/?lattlong=${req.body.lat},${req.body.long}`);
    res.status(200).json(locationData);
    console.log(JSON.parse(locationData));

  } catch (error) {
    res.status(500).json({ error: 'Metaweather API arror' });
  }
};
