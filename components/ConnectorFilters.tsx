import { useState, useEffect } from 'react';
import { ChargingStation } from '../lib/types';

// Add the chargingStations prop to the ConnectorFiltersProps interface
interface ConnectorFiltersProps {
  onChange: (connectors: number[]) => void;
  chargingStations: ChargingStation[];
}

const ConnectorFilters: React.FC<ConnectorFiltersProps> = ({ onChange, chargingStations }) => {
  const [type2, setType2] = useState(true);
  const [chademo, setChademo] = useState(true);
  const [ccs, setCcs] = useState(true);

  useEffect(() => {
    const selectedConnectors = [
      ...(type2 ? [25] : []),
      ...(chademo ? [2] : []),
      ...(ccs ? [33] : []),
    ];
    console.log('Conn:', selectedConnectors.toString())
    onChange(selectedConnectors);
  }, [type2, chademo, ccs]);

  const countConnectorType = (typeId: number) => {
  const uniqueStations = new Set<number>();
  chargingStations.forEach(station => {
    station.Connections.forEach(connection => {
      if (connection.ConnectionTypeID === typeId) {
        uniqueStations.add(station.ID);
      }
    });
  });
  return uniqueStations.size;
};


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const connectorId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (connectorId === 25) setType2(isChecked);
    if (connectorId === 2) setChademo(isChecked);
    if (connectorId === 33) setCcs(isChecked);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            value="25"
            checked={type2}
            onChange={handleCheckboxChange}
          />
          Type 2 (25) - {countConnectorType(25)}
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="2"
            checked={chademo}
            onChange={handleCheckboxChange}
          />
          CHAdeMO (2) - {countConnectorType(2)}
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="33"
            checked={ccs}
            onChange={handleCheckboxChange}
          />
          CCS (33) - {countConnectorType(33)}
        </label>
      </div>
    </div>
  );
};

export default ConnectorFilters;
