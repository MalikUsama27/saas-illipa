// Receipt.js
import React from 'react';
import DataTableComponent from '../reusable/DataTableComponent'; // Adjust path as needed

const Receipt = () => {
  const columns = [
    { field: 'billingMonth', header: 'Billing Month' },
    { field: 'revenuePlan', header: 'Revenue Plan' },
    { field: 'billedAmount', header: 'Billed Amount' },
    { field: 'date', header: 'Date' },
    { field: 'transactionId', header: 'Transaction ID' },
    { field: 'nextBillingDate', header: 'Next Billing Date' },
  ];

  const data = [
    { billingMonth: 'July 2024', revenuePlan: 'Basic', billedAmount: '$100', date: '2024-07-01', transactionId: 'T12345', nextBillingDate: '2024-08-01' },
    { billingMonth: 'June 2024', revenuePlan: 'Standard', billedAmount: '$200', date: '2024-06-01', transactionId: 'T12346', nextBillingDate: '2024-07-01' },
    { billingMonth: 'May 2024', revenuePlan: 'Premium', billedAmount: '$300', date: '2024-05-01', transactionId: 'T12347', nextBillingDate: '2024-06-01' },
  ];

  return (
    <div>
      {/* <h1 style={{ textAlign: 'center' }}>Company Billing Details</h1> */}
      <DataTableComponent
        header="Billing Table"
        columns={columns}
        data={data}
        showEdit={false}   // No edit functionality needed
        showreceipt={false} // Receipt functionality not required
        showdollar={false}  // Dollar functionality not required
      />
    </div>
  );
};

export default Receipt;
