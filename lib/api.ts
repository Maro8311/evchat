import { ChargingStation } from './types';

const API_BASE_URL = '/api/chargingStations';

export const getChargingStations = async (
  latitude: number,
  longitude: number,
  radius: number,
  maxresults: number,
  connectorTypeIds: number[],
  useClientSideFiltering: boolean = false
): Promise<ChargingStation[]> => {
  const url = new URL(API_BASE_URL, window.location.href);
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('radius', String(radius));
  url.searchParams.set('maxresults', String(maxresults));
  url.searchParams.set('connectorTypeIds', connectorTypeIds.join(','));
  url.searchParams.set('useClientSideFiltering', String(useClientSideFiltering));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();

  return data;
};
