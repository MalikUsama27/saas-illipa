import React, { useState } from 'react';
import DataTableComponent from '../reusable/DataTableComponent';

const modulesData = [
  {
    id: 545,
    name: 'Sale',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
  {
    id: 546,
    name: 'CRM',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
  {
    id: 547,
    name: 'Accounting',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
  }
];

const Modules = () => {
  const [modules, setModules] = useState(modulesData);

  const handlePremiumChange = (e, id) => {
    const updatedModules = modules.map(module => 
      module.id === id ? { ...module, premium: e.value } : module
    );
    setModules(updatedModules);
  };

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'monthlyPrice', header: 'Monthly Price' },
    { field: 'yearlyPrice', header: 'Yearly Price' },
    { field: 'premium', header: 'Premium' }
  ];

  return (
    <div>
      {/* <h2>Modules</h2> */}
      <DataTableComponent 
        columns={columns} 
        data={modules} 
        onPremiumChange={handlePremiumChange} 
        showEdit={false}
      />
    </div>
  );
};

export default Modules;
