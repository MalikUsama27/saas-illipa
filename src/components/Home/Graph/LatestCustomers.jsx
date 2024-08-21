import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/LatestCustomers.css';

const LatestCustomers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch the latest customers from the API
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://ilipaone.com/api/users?user=customers');
                const data = response.data;
                setCustomers(data.slice(-5).reverse()); // Get the latest 5 customers
            } catch (error) {
                console.error("Error fetching customers", error);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div className="latest-customers" style={{width:'24%'}}>
            <h3>Latest Customers</h3>
            {customers.map((customer, index) => (
                <div key={index} className="customer">
                    
                    <div className="customer-info">
                        <div className="customer-name">{customer.username}</div>
                        <div className="customer-details">
                            {customer.user_fields.industry} at {customer.user_fields.company_name}
                        </div>
                        <div className="customer-email">{customer.email}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LatestCustomers;
