import React, { useEffect, useRef } from 'react';
import * as venn from 'venn.js';
import { select } from 'd3-selection';

const VennDiagram = ({ stations }) => {
  const vennRef = useRef(null);

  useEffect(() => {
    if (!vennRef.current) {
      return;
    }

    const connectorCombinations = countConnectorCombinations(stations)

    const sets = Object.entries(connectorCombinations).map(([key, count]) => {
      const labels = key.split(',').map((id) => `Type ${id}`);
      return {
        sets: labels,
        size: count,
        label: `${labels.join(', ')} (${count})`,
      };
    });

    console.log(sets);

    const chart = venn.VennDiagram().width(500).height(400);

    select(vennRef.current)
      .datum({ sets })
      .call(chart)
      .selectAll('text')
      .style('fill', 'white')
      .style('font-family', 'Arial')
      .style('font-size', '14px');
  }, [vennRef, stations]);

  return <div ref={vennRef} />;
};

export default VennDiagram;

const countConnectorCombinations = (chargingStations) => {
    const combinationCounts = {};
  
    chargingStations.forEach((station) => {
      const connectorTypes = new Set();
  
      station.Connections.forEach((connection) => {
        connectorTypes.add(connection.ConnectionTypeID);
      });
  
      const combinationKey = Array.from(connectorTypes).sort().join(',');
  
      if (!combinationCounts[combinationKey]) {
        combinationCounts[combinationKey] = 0;
      }
  
      combinationCounts[combinationKey]++;
    });
  
    return combinationCounts;
  };
  