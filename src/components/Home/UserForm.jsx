import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css'; 

const UserForm = () => {
    const users = [
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
        },
    ];

    const actionTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-primary p-button-sm"
                    style={{
                        marginRight: '8px',
                        backgroundColor: '#1F2937',
                        borderColor: '#1F2937',
                        color: '#fff',
                        textAlign: 'center'
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    style={{
                        marginRight: '8px',
                        backgroundColor: '#d9534f',
                        borderColor: '#d9534f',
                        color: '#fff',
                        textAlign: 'center'
                    }}
                />
                <Button
                    icon="pi pi-info-circle"
                    className="p-button-success p-button-sm"
                    style={{
                        backgroundColor: '#4CAF50',
                        borderColor: '#4CAF50',
                        color: '#fff',
                        textAlign: 'center'
                    }}
                />
            </div>
        );
    };

    return (
        <div className="datatable-responsive-demo">
            <DataTable value={users} className="p-datatable-responsive">
                <Column field="companyName" header="Company Name" />
                <Column field="email" header="Email" />
                <Column field="mobile" header="Mobile" />
                <Column field="username" header="Owner Name" />
                <Column 
                    field="currentRevenue" 
                    header="Current Revenue" 
                    body={(rowData) => (
                        typeof rowData.currentRevenue === 'string' 
                            ? rowData.currentRevenue 
                            : `$${rowData.currentRevenue.toFixed(2)}`
                    )}
                />
                <Column 
                    field="revenuePlan" 
                    header="Revenue Plan" 
                    body={(rowData) => `$${rowData.revenuePlan.toFixed(2)}`} 
                />
                <Column field="premiumModule" header="Premium Module" />
                <Column field="premiumPlan" header="Premium Plan" />
                <Column header="Actions" body={actionTemplate} />
            </DataTable>
        </div>
    );
};

export default UserForm;
