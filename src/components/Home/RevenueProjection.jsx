import React from 'react';
import DataTableComponent from '../reusable/DataTableComponent'; 

const RevenueProjection = () => {
  const columns = [
    { field: 'joiningDate', header: 'Joining Date' },
    { field: 'currentRevenue', header: 'Current Revenue' },
    { field: 'threeMonthRevenue', header: '3-month Revenue' },
    { field: 'projectedRevenue', header: 'Projected Revenue' },
    { field: 'threshold', header: 'Threshold' },
    { field: 'amount', header: 'Amount' },
  ];

  const data = [
    { joiningDate: '2023-01-01', currentRevenue: 5000, threeMonthRevenue: 15000, projectedRevenue: 60000, threshold: 20000, amount: 500 },
    { joiningDate: '2023-02-01', currentRevenue: 7000, threeMonthRevenue: 21000, projectedRevenue: 84000, threshold: 30000, amount: 700 },
    { joiningDate: '2023-03-01', currentRevenue: 6000, threeMonthRevenue: 18000, projectedRevenue: 72000, threshold: 25000, amount: 600 },
    { joiningDate: '2023-04-01', currentRevenue: 8000, threeMonthRevenue: 24000, projectedRevenue: 96000, threshold: 35000, amount: 800 },
    { joiningDate: '2023-05-01', currentRevenue: 9000, threeMonthRevenue: 27000, projectedRevenue: 108000, threshold: 40000, amount: 900 },
  ];

  return (
    <div>
      <DataTableComponent 
        columns={columns} 
        data={data} 
        header="Revenue Projection"
        showActions={false} 
      />
    </div>
  );
}

export default RevenueProjection;
