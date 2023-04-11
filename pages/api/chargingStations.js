import { getChargingStations } from './chargingStationsApi';

export default async function handler(req, res) {
  const { latitude, longitude, radius, maxresults, connectorTypeIds } = req.query;

  try {
    const stations = await getChargingStations(
      latitude,
      longitude,
      radius,
      maxresults,
      connectorTypeIds.split(',').map((id) => parseInt(id))
    );
    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve charging stations' });
  }
}
