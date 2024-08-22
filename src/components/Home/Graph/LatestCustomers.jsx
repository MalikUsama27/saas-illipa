import React, { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import '../../../css/LatestCustomers.css';

const LatestCustomers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://ilipaone.com/api/users?user=customers');
                const data = response.data;
                setCustomers(data.slice(-5).reverse());
            } catch (error) {
                console.error("Error fetching customers", error);
                // You might want to show an error message to the user here
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div className="latest-customers">
            <h3>Latest Customers</h3>
            {customers.map((customer, index) => (
                <div key={index} className="customer-card">
                    <Avatar
                        label={getInitials(customer.username)}
                        className="avatar"
                        shape="circle"
                        style={{  backgroundColor: '#007bff'
                            //  getAvatarColor(getInitials(customer.username)) 
                            }}
                    />
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

const getInitials = (username) => {
    const initials = username.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
};

// const getAvatarColor = (initials) => {
//     const colors = {
//         'BS': '#28a745',
//         'LA': '#ffc107',
//         'JB': '#007bff',
//         'JJ': '#17a2b8',
//         'AB': '#dc3545',
//         'AF': '#ff9800'
//     };
//     return colors[initials] || '#6f42c1';
// };

export default LatestCustomers;
