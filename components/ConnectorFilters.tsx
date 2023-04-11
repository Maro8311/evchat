import { useState, useEffect } from 'react';

interface ConnectorFiltersProps {
  onChange: (connectors: number[]) => void;
}

const ConnectorFilters: React.FC<ConnectorFiltersProps> = ({ onChange }) => {
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
          Type 2 (25)
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
          CHAdeMO (2)
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
          CCS (33)
        </label>
      </div>
    </div>
  );
};

export default ConnectorFilters;
