import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import DataTableComponent from '../reusable/DataTableComponent';
import InputComponent from '../reusable/InputComponent';

const initialData = [
  { id: 1, title: 'Plan A', minValue: 1000, maxValue: 5000, amount: 100, active: false },
  { id: 2, title: 'Plan B', minValue: 5001, maxValue: 10000, amount: 200, active: true },
  { id: 3, title: 'Plan C', minValue: 10001, maxValue: 20000, amount: 300, active: false },
];

const RevenuePlan = () => {
  const [data, setData] = useState(initialData); 
  const navigate = useNavigate();

  const handleAddRevenueClick = () => {
    navigate('/dashboard/add-revenue');
  };

  const handleSwitchChange = (e, id) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, active: e.value } : item
    );
    setData(updatedData);
  };

  const columns = [
    { field: 'title', header: 'Title' },
    { field: 'minValue', header: 'Min Value' },
    { field: 'maxValue', header: 'Max Value' },
    { field: 'amount', header: 'Amount' },
    { field: 'active', header: 'Active' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          label="Add Revenue Plan"
          style={{ margin: '5px', backgroundColor: '#434191' }}
          onClick={handleAddRevenueClick}
        />
      </div>
      <DataTableComponent
        columns={columns}
        data={data}
        onSwitchChange={handleSwitchChange}
        showEdit={false}
      />
    </div>
  );
};

export default RevenuePlan;
