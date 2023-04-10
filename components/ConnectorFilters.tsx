import { useState } from 'react';

interface ConnectorFiltersProps {
  onChange: (connectors: number[]) => void;
}

const ConnectorFilters: React.FC<ConnectorFiltersProps> = ({ onChange }) => {
  const [type2, setType2] = useState(true);
  const [chademo, setChademo] = useState(true);
  const [ccs, setCcs] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const connectorId = parseInt(event.target.value);
    const isChecked = event.target.checked;
    
    if (connectorId === 25) setType2(isChecked);
    if (connectorId === 2) setChademo(isChecked);
    if (connectorId === 33) setCcs(isChecked);
    
    // fix state update problem
    let _type2, _chademo, _ccs = null;
    if (connectorId === 25) {_type2 = isChecked;_chademo = chademo;_ccs = ccs;}
    if (connectorId === 2) {_type2 = type2;_chademo = isChecked;_ccs = ccs;}
    if (connectorId === 33) {_type2 = type2;_chademo = chademo;_ccs = isChecked;}
    
    const selectedConnectors = [
        ...(_type2 ? [25] : []),
        ...(_chademo ? [2] : []),
        ...(_ccs ? [33] : []),
    ];
    console.log(`${selectedConnectors}`)
    onChange(selectedConnectors);
  };

  return (
    <form>
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
    </form>
  );
};

export default ConnectorFilters;
