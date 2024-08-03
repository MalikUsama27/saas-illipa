import React, { useState } from 'react';
import DataTableComponent from '../reusable/DataTableComponent';
import { Outlet } from 'react-router-dom';

const modulesData = [
  {
    id: 545,
    name: 'Sale',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 546,
    name: 'CRM',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 547,
    name: 'Accounting',
    description: 'Lorem Ipsum dolor sit amet',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  }
];

const Modules = () => {
  const [modules, setModules] = useState(modulesData);

 
  const handleActiveChange = (id, newStatus) => {
    const updatedModules = modules.map(module =>
      module.id === id ? { ...module, active: newStatus } : module
    );
    setModules(updatedModules);
  };

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'monthlyPrice', header: 'Monthly Price' },
    { field: 'yearlyPrice', header: 'Yearly Price' },
    
    { field: 'active', header: 'Premium' } 
  ];

  return (
    <div style={{paddingTop:'58px'}}>
      <DataTableComponent 
        header="Modules"
        columns={columns} 
        data={modules} 
        onSwitchChange={handleActiveChange} 
        showActions={true} 
        showEdit={true}
        showdelete={true} 
        showinfo={true}
      />
      <Outlet/>
    </div>
  );
};

export default Modules;
