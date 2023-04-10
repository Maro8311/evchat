import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getCurrentPosition } from '../lib/geolocation';
import { getChargingStations } from '../lib/api';
import { CONNECTOR_TYPE_IDS } from '../lib/constants';
import { ChargingStation } from '../lib/types';
import ConnectorFilters from '../components/ConnectorFilters';
import {MaxResultsDropdown, RadiusInput} from '../components/RadiusInput';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState(CONNECTOR_TYPE_IDS);
  const [maxResults, setMaxResults] = useState(100);
  const [radius, setRadius] = useState(10);

  useEffect(() => {
    const getPositionAndStations = async () => {
      try {
        const pos = await getCurrentPosition();
        setPosition(pos);
        const stations = await getChargingStations(
          pos.coords.latitude,
          pos.coords.longitude,
          radius,
          maxResults,
          selectedConnectors,
        );
        setChargingStations(stations);
      } catch (error) {
        console.error(error);
      }
    };

    getPositionAndStations();
  }, [selectedConnectors, maxResults, radius]);

  const handleConnectorFilterChange = (connectors: number[]) => {
    setSelectedConnectors(connectors);
  };

  const handleMaxResultsChange = (maxResults: number) => {
    setMaxResults(maxResults);
  };

  const handleRadiusChange = (radius: number) => {
    setRadius(radius);
  };

  return (
    <>
      <ConnectorFilters onChange={handleConnectorFilterChange} />
      <MaxResultsDropdown onChange={handleMaxResultsChange} initialMaxResults={maxResults} />
      <RadiusInput onChange={handleRadiusChange} initialRadius={radius} />
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <Map position={position} chargingStations={chargingStations} />
      </div>
    </>
  );
}

