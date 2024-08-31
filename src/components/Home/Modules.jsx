import React, { useState } from 'react';
import DataTableComponent from '../reusable/DataTableComponent';
import { Outlet } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';
import PremiumDialog from '../Home/Modules/PremiumDialog';
import { Dialog } from 'primereact/dialog';

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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleActiveChange = (id, checked) => {
    setSelectedModule(modules.find(module => module.id === id));
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  const handleDialogConfirm = () => {
    const updatedModules = modules.map(module =>
      module.id === selectedModule.id ? { ...module, active: !selectedModule.active } : module
    );
    setModules(updatedModules);
    setDialogVisible(false);
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
        const description = isExpanded 
          ? rowData.description 
          : `${rowData.description.split(' ').slice(0, 5).join(' ')}...`;
        return (
          <div>
            {description}
            {rowData.description.length > 100 && (
              <span
                onClick={() => handleDescriptionClick(rowData.id)}
                style={{ 
                  color: 'blue', 
                  textDecoration: 'underline', 
                  fontStyle: 'italic',
                  cursor: 'pointer'
                }}
              >
                {isExpanded ? ' read less' : ' read more'}
              </span>
            )}
          </div>
        );
      }
    },
    { field: 'monthlyPrice', header: 'Fees' },
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
      <Dialog 
        header="Confirm Premium Activation" 
        visible={dialogVisible} 
        modal 
        onHide={handleDialogClose}
      >
        <PremiumDialog 
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogClose}
          module={selectedModule}
        />
      </Dialog>
      <Outlet />
    </div>
  );
};

export default Modules;
