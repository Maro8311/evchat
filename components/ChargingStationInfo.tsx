import { ChargingStation } from '../lib/types';
import { calculateDistance } from '../lib/utils';

interface ChargingStationInfoProps {
  station: ChargingStation;
  userPosition: Position;
}

const ChargingStationInfo: React.FC<ChargingStationInfoProps> = ({
  station,
  userPosition,
}) => {
  const distance = calculateDistance(
    userPosition.coords.latitude,
    userPosition.coords.longitude,
    station.AddressInfo.Latitude,
    station.AddressInfo.Longitude
  );

  const renderAttribute = (attribute: any) => {
    if (attribute == null || attribute === '') {
      return 'N/A';
    } else {
      return attribute;
    }
  };

  return (
    <div>
      <h3>{renderAttribute(station.AddressInfo.Title)}</h3>
      <p>
        {renderAttribute(station.AddressInfo.AddressLine1)},{' '}
        {renderAttribute(station.AddressInfo.Town)},{' '}
        {renderAttribute(station.AddressInfo.StateOrProvince)},{' '}
        {renderAttribute(station.AddressInfo.Postcode)}
      </p>
      <p>Country ID: {renderAttribute(station.AddressInfo.CountryID)}</p>
      <p>
        Coordinates:{' '}
        {renderAttribute(station.AddressInfo.Latitude)},{' '}
        {renderAttribute(station.AddressInfo.Longitude)}
      </p>
      <p>Operator: {renderAttribute(station.OperatorInfo?.Title)}</p>
      <p>Distance: {distance.toFixed(2)} km</p>
      <p>Status: {station.StatusType?.IsAvailable ? 'Available' : 'Occupied'}</p>
      <p>Connectors:</p>
      <ul>
        {station.Connections.map((connection) => (
          <li key={connection.ID}>
            Plug Type: {connection.ConnectionTypeID}, Max Power: {connection.PowerKW} kW,{' '}
            Quantity: {connection.Quantity}, Pricing Info: (add pricing info if available)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargingStationInfo;
