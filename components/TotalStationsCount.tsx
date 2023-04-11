import React from 'react';

interface TotalStationsCountProps {
  count: number;
}

const TotalStationsCount: React.FC<TotalStationsCountProps> = ({ count }) => {
  return (
    <span>
      Total Stations: {count}
    </span>
  );
};

export default TotalStationsCount;
