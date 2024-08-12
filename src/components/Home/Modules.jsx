import React, { useState } from 'react';
import DataTableComponent from '../reusable/DataTableComponent';
import { Outlet } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';

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

  const handleActiveChange = (id, checked) => {
    const updatedModules = modules.map(module =>
      module.id === id ? { ...module, active: checked } : module
    );
    setModules(updatedModules);
  };

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'monthlyPrice', header: 'Monthly Price' },
    { field: 'yearlyPrice', header: 'Yearly Price' },
    {
      field: 'active',
      header: 'Active',
      body: rowData => (
        <InputSwitch
          checked={rowData.active}
          onChange={(e) => handleActiveChange(rowData.id, e.value)}
        />
      )
    }
  ];

  return (
    

    <div style={{ paddingTop: '58px' }}>
      <DataTableComponent 
        header="Modules"
        columns={columns} 
        data={modules} 
        showActions={true} 
        showEdit={true}
        showdelete={true} 
      />
      <Outlet />
    </div>
  );
};

export default Modules;
