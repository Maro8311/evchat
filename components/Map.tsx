import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ChargingStation } from '../lib/types';
import ChargingStationInfo from './ChargingStationInfo';

interface MapProps {
  position: GeolocationPosition;
  chargingStations: ChargingStation[];
}

const MapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Map: React.FC<MapProps> = ({ position, chargingStations }) => {
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

  return (
    <MapContainer
      center={[position.coords.latitude, position.coords.longitude]}
      zoom={13}
      style={{ height: '90%', width: '100%' }}
      scrollWheelZoom={false}
    >
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
    </MapContainer>
  );
};

export default Map;
