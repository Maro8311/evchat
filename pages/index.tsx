import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { getCurrentPosition } from '../lib/geolocation';
import { getChargingStations } from '../lib/api';
import { CONNECTOR_TYPE_IDS } from '../lib/constants';
import { ChargingStation } from '../lib/types';
import ConnectorFilters from '../components/ConnectorFilters';
import TotalStationsCount from '../components/TotalStationsCount';
import { MaxResultsDropdown, RadiusInput } from '../components/RadiusInput';
import VennDiagram from '../components/VennDiagram';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const defaultBerlinPosition: GeolocationPosition = {
    coords: {
      latitude: 52.5200,
      longitude: 13.4050,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: Date.now(),
  };

  const [position, setPosition] = useState<GeolocationPosition>(defaultBerlinPosition);
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState(CONNECTOR_TYPE_IDS);
  const [maxResults, setMaxResults] = useState(100);
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);

  const getStations = async (pos = position) => {
    setLoading(true);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const getPositionAndStations = async () => {
    try {
      const pos = await getCurrentPosition();
      setPosition(pos);
      await getStations(pos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useEffect');

    // Fetch the initial data only if there are no charging stations.
    if (chargingStations.length === 0) {
      getPositionAndStations();
    } else {
      // Update the data when filters are changed or the map is dragged.
      getStations();
    }
  }, [selectedConnectors, maxResults, radius]);

  const handlePositionChange = async (newPosition: GeolocationPosition) => {
    setPosition(newPosition);
    await getStations();
  };

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
      {/* {chargingStations.length > 0 && <VennDiagram stations={chargingStations} />} */}
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10px', left: '10px', zIndex: 1000, backgroundColor: 'white',
          padding: '10px', borderRadius: '5px',
        }}
        >
          <ConnectorFilters onChange={handleConnectorFilterChange} chargingStations={chargingStations} />
          <MaxResultsDropdown onChange={handleMaxResultsChange} initialMaxResults={maxResults} />
          <TotalStationsCount count={chargingStations.length} />
          <RadiusInput onChange={handleRadiusChange} initialRadius={radius} />
        </div>
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
            }}
          >
            <ReactLoading type="spin" color="#3f51b5" />
          </div>
        )}
        <Map position={position} chargingStations={chargingStations} onPositionChange={handlePositionChange} />
      </div>
    </>
  );
}

