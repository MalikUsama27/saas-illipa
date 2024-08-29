import React, { useState } from 'react';
import DataTableComponent from '../reusable/DataTableComponent';
import { Outlet } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';

const modulesData = [
  {
    id: 545,
    name: 'Accounts & Finance',
    description: 'Oversee financial operations, including invoicing, payments, and budgeting, to ensure accurate and compliant accounting.',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 546,
    name: 'POS',
    description: 'Process transactions quickly and efficiently at the point of sale, with real-time inventory and sales tracking.',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 547,
    name: 'Sales',
    description: 'Manage customer relationships, track sales orders, and streamline the sales process from lead generation to order fulfillment.',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 548,
    name: 'Inventory Management',
    description: 'Monitor stock levels, manage warehouse operations, and automate reordering to maintain optimal inventory.',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  },
  {
    id: 549,
    name: 'HRM',
    description: 'Handle employee management, payroll, benefits, and recruitment to streamline HR processes and improve workforce management.',
    premium: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    active: false 
  }
];

const Modules = () => {
  const [modules, setModules] = useState(modulesData);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleActiveChange = (id, checked) => {
    const updatedModules = modules.map(module =>
      module.id === id ? { ...module, active: checked } : module
    );
    setModules(updatedModules);
  };

  const handleDescriptionClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    {
      field: 'description',
      header: 'Description',
      body: rowData => {
        const isExpanded = expandedRow === rowData.id;
        const description = isExpanded ? rowData.description : `${rowData.description.split(' ').slice(0, 5).join(' ')} `;
        return (
          <div>
            {description}
            {!isExpanded && (
              <span
                onClick={() => handleDescriptionClick(rowData.id)}
                style={{ 
                  color: 'blue', 
                  textDecoration: 'underline', 
                  fontStyle: 'italic',
                  cursor: 'pointer'
                }}
              >
                read more
              </span>
            )}
          </div>
        );
      }
    },
    { field: 'monthlyPrice', header: 'Monthly Price' },
    { field: 'yearlyPrice', header: 'Yearly Price' },
    {
      field: 'active',
      header: 'Make Premium',
      body: rowData => (
        <InputSwitch
          checked={rowData.active}
          onChange={(e) => handleActiveChange(rowData.id, e.value)}
        />
      )
    }
  ];

  return (
    <div>
      <DataTableComponent 
        header="Modules"
        columns={columns} 
        data={modules} 
      />
      <Outlet />
    </div>
  );
};

export default Modules;
