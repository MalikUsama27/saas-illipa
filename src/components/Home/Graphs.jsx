import React from 'react';
import GraphsList from './Graph/GraphsList';
import RevenueGraph from './Graph/RevenueGraph';
import LatestCustomers from './Graph/LatestCustomers';

const Graphs = () => {

  const rowStyle = {
    display: 'flex',
    gap: '16px', 
    flexWrap: 'wrap', 
  };

  return (
    <div>
      <GraphsList />
      <div style={rowStyle}>
        <RevenueGraph />
        <LatestCustomers />
      </div>
    </div>
  );
};

export default Graphs;
