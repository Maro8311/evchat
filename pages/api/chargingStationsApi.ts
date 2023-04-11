import { ChargingStation } from '../../lib/types';

const API_BASE_URL = 'https://api.openchargemap.io/v3/poi';
const apiKey = process.env.OPENCHARGEMAP_API_KEY;

export const getChargingStations = async (
  latitude: number,
  longitude: number,
  radius: number,
  maxresults: number,
  connectorTypeIds: number[],
  useClientSideFiltering: boolean = false
): Promise<ChargingStation[]> => {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('output', 'json');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('distanceunit', 'KM');
  url.searchParams.set('distance', String(radius));
  url.searchParams.set('countrycode', 'DE');
  url.searchParams.set('maxresults', String(maxresults));
  url.searchParams.set('compact', 'false');
  url.searchParams.set('verbose', 'true');
  if (!useClientSideFiltering) {
    url.searchParams.set('connectiontypeid', connectorTypeIds.join());
  }
  if (apiKey) {
    url.searchParams.set('key', apiKey);
  } else {
    throw new Error('API key is not defined');
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();

  const stations = data.map((station: any) => ({
    ID: station.ID,
    Title: station.AddressInfo?.Title,
    AddressLine1: station.AddressInfo?.AddressLine1,
    Town: station.AddressInfo?.Town,
    StateOrProvince: station.AddressInfo?.StateOrProvince,
    Postcode: station.AddressInfo?.Postcode,
    Country: station.AddressInfo?.Country?.Title,
    Latitude: station.AddressInfo?.Latitude,
    Longitude: station.AddressInfo?.Longitude,
    Operator: station.OperatorInfo?.Title,
    UsageCost: station.UsageCost,
    Connections: station.Connections,
    StatusType: station.StatusType,
    UsageType: station.UsageType,
    AddressInfo: station.AddressInfo,
  })) as ChargingStation[];

  if (useClientSideFiltering) {
    const filteredStations = stations.filter((station) =>
      station.Connections && station.Connections.some((connection) =>
        connection.ConnectionTypeID !== undefined && connectorTypeIds.includes(connection.ConnectionTypeID)
      )
    );
    return filteredStations;
  }

  return stations;
};
