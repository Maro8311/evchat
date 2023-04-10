import { useState } from 'react';

interface RadiusInputProps {
  onChange: (radius: number) => void;
  _radius: number;
}

export const RadiusInput: React.FC<RadiusInputProps> = ({
  onChange,
  _radius,
}) => {
  const [radius, setRadius] = useState(_radius);

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(event.target.value));
    onChange(parseInt(event.target.value));
  };

  return (
    <form>
      <label>
        Radius (km):
        <input type="range" min={0} max={20} value={radius} onChange={handleRadiusChange} />
        {radius} km
      </label>
    </form>
  );
};

interface MaxResultsDropdownProps {
  onChange: (maxResults: number) => void;
  initialMaxResults: number;
}

export const MaxResultsDropdown: React.FC<MaxResultsDropdownProps> = ({
  onChange,
  initialMaxResults,
}) => {
  const [maxResults, setMaxResults] = useState(initialMaxResults);

  const handleMaxResultsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setMaxResults(value);
    onChange(value);
  };

  return (
    <label>
      Max Results:
      <select value={maxResults} onChange={handleMaxResultsChange}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
        <option value={500}>500</option>
      </select>
    </label>
  );
};

