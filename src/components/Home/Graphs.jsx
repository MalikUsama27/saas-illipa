import React from 'react';
import GraphsList from './Graph/GraphsList';
// import RevenueGraph from './Graph/RevenueGraph';
import LatestCustomers from './Graph/LatestCustomers';
import Industry from './Graph/Industry';
import BarChart from './Graph/BarChart';
import CountryCustomer from './Graph/CountryCustomer';
// import Mapss from './Graph/Mapss';

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
        {/* <RevenueGraph /> */}
        <BarChart/>
        <LatestCustomers />
      </div>
      <div style={rowStyle}>
{/* <Mapss/> */}
      <Industry/>
      <CountryCustomer/>
      </div>
    </div>
  );
};

export default Graphs;
