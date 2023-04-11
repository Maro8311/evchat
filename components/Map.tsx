import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ChargingStation } from '../lib/types';
import ChargingStationInfo from './ChargingStationInfo';

interface MapProps {
  position: GeolocationPosition;
  chargingStations: ChargingStation[];
  onPositionChange: (newPosition: GeolocationPosition) => void;
}

interface MapEventHandlerProps {
  onPositionChange: (newPosition: GeolocationPosition) => void;
}

const MapEventHandler: React.FC<MapEventHandlerProps> = ({ onPositionChange }) => {
  const map = useMap();

  const handleMouseUp = (event: L.LeafletMouseEvent) => {
    // console.log('Mouse up event:', event);

    const center = map.getCenter();
    // console.log('Map center:', center);

    // Create a new GeolocationPosition object
    const newPosition: GeolocationPosition = {
      coords: {
        latitude: center.lat,
        longitude: center.lng,
      },
      timestamp: Date.now(),
    };

    // Call the callback function with the new position
    onPositionChange(newPosition);
  };

  useMapEvent('mouseup', handleMouseUp);

  return null;
};

const Map: React.FC<MapProps> = ({ position, chargingStations, onPositionChange }) => {
  const greenIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const redIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const yellowIcon = new Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleMouseUp = (event: L.LeafletMouseEvent, map: L.Map) => {
    console.log('Mouse up event:', event);

    const center = map.getCenter();
    console.log('Map center:', center);

    // Your custom logic here
  };

  return (
    <MapContainer
      center={[position.coords.latitude, position.coords.longitude]}
      zoom={13}
      zoomControl={false}
      style={{ height: '90%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <MapEventHandler onPositionChange={onPositionChange} />
      <ZoomControl position="topleft" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {chargingStations.map((station) => {
        const markerIcon =
          station.StatusType?.IsOperational === null
            ? yellowIcon
            : station.StatusType?.IsOperational
              ? greenIcon
              : redIcon;

        return (
          <Marker
            key={station.ID}
            position={[
              station.AddressInfo.Latitude,
              station.AddressInfo.Longitude,
            ]}
            icon={markerIcon}
          >
            <Popup>
              <ChargingStationInfo station={station} userPosition={position} />
            </Popup>
          </Marker>
        );
      })}
      {/* <ChangeView center={[position.coords.latitude, position.coords.longitude]}/>  */}
    </MapContainer>
  );
};

export default Map;
