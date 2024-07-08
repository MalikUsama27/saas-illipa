import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const UserForm = () => {
    const users = [
        {
            id: 1,
            username: 'Johnson',
            email: 'johnson@abc.com',
            mobile: '(995) 555-1234',
            companyName: 'Lorem Ipsum dolor sit amet',
            currentRevenue: 100.00,
            revenuePlan: 100.00,
            premiumModule: 'Tax Connect',
            premiumPlan: 'Anually',
        },
        // Add more users here
    ];
    const actionTemplate = (rowData) => {
      return (
          <div>
              <Button label="Edit" className="p-button-primary p-button-sm" style={{ marginRight: '8px', backgroundColor: '#1F2937', borderColor: '#1F2937' }} />
              <Button label="Delete" className="p-button-danger p-button-sm" style={{ marginRight: '8px' }} />
              <Button label="Detail" className="p-button-success p-button-sm" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }} />
          </div>
      );
  };

    return (
        <div className="datatable-responsive-demo">
            <DataTable value={users} className="p-datatable-responsive">
                <Column field="username" header="Username" />
                <Column field="email" header="Email" />
                <Column field="mobile" header="Mobile" />
                <Column field="companyName" header="Company Name" />
                <Column field="currentRevenue" header="Current Revenue" body={(rowData) => `$${rowData.currentRevenue.toFixed(2)}`} />
                <Column field="revenuePlan" header="Revenue Plan" body={(rowData) => `$${rowData.revenuePlan.toFixed(2)}`} />
                <Column field="premiumModule" header="Premium Module" />
                <Column field="premiumPlan" header="Premium Plan" />
                <Column header="Actions" body={actionTemplate} />
            </DataTable>
        </div>
    );
};

export default UserForm;
