import React from 'react';
import DataTableComponent from "../reusable/DataTableComponent";

const usersData = [
  {
    id: 1,
    username: 'Johnson',
    email: 'johnson@abc.com',
    mobile: '(995) 555-1234',
    companyName: 'Lorem Ipsum dolor sit amet',
    currentRevenue: "Not Calculated Yet",
    revenuePlan: 100.00,
    premiumModule: 'Tax Connect',
    premiumPlan: 'Annually',
  },
  {
    id: 2,
    username: 'Johnson',
    email: 'johnson@abc.com',
    mobile: '(995) 555-1234',
    companyName: 'Lorem Ipsum dolor sit amet',
    currentRevenue: "Not Calculated Yet",
    revenuePlan: 100.00,
    premiumModule: 'Tax Connect',
    premiumPlan: 'Annually',
  },
  {
    id: 3,
    username: 'Johnson',
    email: 'johnson@abc.com',
    mobile: '(995) 555-1234',
    companyName: 'Lorem Ipsum dolor sit amet',
    currentRevenue: "Not Calculated Yet",
    revenuePlan: 100.00,
    premiumModule: 'Tax Connect',
    premiumPlan: 'Annually',
  }
];

const UserForm = () => {
  const columns = [
    { field: 'companyName', header: 'Company Name' },
    { field: 'email', header: 'Email' },
    { field: 'mobile', header: 'Mobile' },
    { field: 'username', header: 'Owner Name' },
    { field: 'currentRevenue', header: 'Current Revenue', body: (rowData) => (
      typeof rowData.currentRevenue === 'string' ? rowData.currentRevenue : `$${rowData.currentRevenue.toFixed(2)}`
    )},
    { field: 'revenuePlan', header: 'Revenue Plan', body: (rowData) => `$${rowData.revenuePlan.toFixed(2)}` },
    { field: 'premiumModule', header: 'Premium Module' },
    { field: 'premiumPlan', header: 'Premium Plan' }
  ];

  return (
    <DataTableComponent 
      columns={columns} 
      data={usersData}
      showEdit={true} 
    />
  );
};

export default UserForm;
