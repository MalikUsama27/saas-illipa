import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DataTableComponent from '../reusable/DataTableComponent';
import { RingLoader } from 'react-spinners';

const Receipt = () => {
  const location = useLocation();
  const { customerId } = location.state || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Customer ID from Location State:', customerId);

    if (customerId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions/${customerId}`);
          const receiptData = response.data.map(receipt => ({
            billingMonth: receipt?.billing_month || 'N/A',
            revenuePlan: receipt?.revenue_plan_threshold|| 'N/A',
            billedAmount: receipt?.billed_amount || 'N/A',
            date: receipt?.date || 'N/A',
            transactionId: receipt?.transaction_id|| 'N/A',
            nextBillingDate: receipt?.next_billing_date || 'N/A',
          }));
          setData(receiptData);
        } catch (error) {
          console.error('Error fetching receipt data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      console.error('No customer ID provided.');
      setLoading(false);
    }
  }, [customerId]);

  const columns = [
    { field: 'billingMonth', header: 'Billing Month' },
    { field: 'revenuePlan', header: 'Revenue Plan' },
    { field: 'billedAmount', header: 'Billed Amount' },
    { field: 'date', header: 'Date' },
    { field: 'transactionId', header: 'Transaction ID' },
    { field: 'nextBillingDate', header: 'Next Billing Date' },
  ];

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <RingLoader color="#06163A" />
        </div>
      ) : (
        <DataTableComponent
          header="Transaction Details"
          columns={columns}
          data={data}
          showEdit={false}
          showReceipt={false}
          showdelete={false}
          showdollar={false}
          showActions={false}
        />
      )}
    </div>
  );
};

export default Receipt;
