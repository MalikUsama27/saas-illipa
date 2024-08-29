import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTableComponent from '../../reusable/DataTableComponent';
import { RingLoader } from 'react-spinners'; // Import RingLoader

const CustomerInfo = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const columns = [
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Mobile' },
    { field: 'industry', header: 'Industry' },
    { field: 'country', header: 'Country' },
    { field: 'company_address', header: 'Company Address' },
    { field: 'company_size', header: 'Company Size' }
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?user=customers`);
        const userData = response.data.map(user => ({
          id: user?.id,
          name: user?.name,
          username: user?.username,
          email: user?.email,
          phone: user?.user_fields?.phone || 'N/A',
          company_name: user?.user_fields?.company_name || 'N/A',
          company_address: user?.user_fields?.company_address || 'N/A',
          country: user?.user_fields?.country || 'N/A',
          company_size: user?.user_fields?.company_size || 'N/A',
          industry: user?.user_fields?.industry || 'N/A',
          userid: user?.user_fields?.user_id,
        }));
        setCustomers(userData);
      } catch (err) {
        console.error("Error fetching customers:", err);
        // Optionally set an error state here
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <RingLoader color="#06163A" />
        </div>
      ) : (
        <DataTableComponent
          header="Customer Info"
          columns={columns}
          data={customers}
        />
      )}
    </div>
  );
};

export default CustomerInfo;
