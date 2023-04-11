import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { getCurrentPosition } from '../lib/geolocation';
import { getChargingStations } from '../lib/api';
import { CONNECTOR_TYPE_IDS } from '../lib/constants';
import { ChargingStation } from '../lib/types';
import ConnectorFilters from '../components/ConnectorFilters';
import { MaxResultsDropdown, RadiusInput } from '../components/RadiusInput';

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
    return await getChargingStations(
      pos.coords.latitude,
      pos.coords.longitude,
      radius,
      maxResults,
      selectedConnectors,
    );
  }

  const getPositionAndStations = async () => {
    setLoading(true);
    try {
      const pos = await getCurrentPosition();
      setPosition(pos);
      const stations = await getStations(pos);
      setChargingStations(stations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log('useEffect')
    getPositionAndStations();
  }, [selectedConnectors, maxResults, radius]);

  const handlePositionChange = async (newPosition: GeolocationPosition) => {
    setPosition(newPosition);
    // console.log('handlePos')
    setLoading(true);
    try {
      const newStations = await getStations();
      setChargingStations(newStations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10px', left: '10px', zIndex: 1000, backgroundColor: 'white',
          padding: '10px', borderRadius: '5px',
        }}
        >
          <ConnectorFilters onChange={handleConnectorFilterChange} />
          <MaxResultsDropdown onChange={handleMaxResultsChange} initialMaxResults={maxResults} />
          <RadiusInput onChange={handleRadiusChange} initialRadius={radius}/>
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

