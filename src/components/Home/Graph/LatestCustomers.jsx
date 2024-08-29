import { RingLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import '../../../css/LatestCustomers.css';

const LatestCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?user=customers`);
                const data = response?.data;
                setCustomers(data.slice(-5).reverse());
            } catch (error) {
                console.error("Error fetching customers", error);
                // Optionally, you might want to set an error state here
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchCustomers();
    }, []);

    // Helper function to get initials from username
    // const getInitials = (username) => {
    //     const initials = username.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    //     return initials;
    // };

    // Helper function to determine avatar color based on initials
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

    return (
        <div className="latest-customers">
            <h3>Latest Customers</h3>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <RingLoader color="#06163A" />
                </div>
            ) : (
                customers.map((customer, index) => (
                    <div key={index} className="customer-card">
                        <Avatar
                            // label={getInitials(customer.username)}
                            icon='pi pi-user'
                            className="avatar"
                            shape="circle"
                            style={{ backgroundColor:'#fff'
                                //  getAvatarColor(getInitials(customer.username)) 
                                }}
                        />
                        <div className="customer-info">
                            <div className="customer-name">{customer.username}</div>
                            <div className="customer-details">
                                {customer.user_fields?.industry} at {customer.user_fields?.company_name}
                            </div>
                            <div className="customer-email">{customer.email}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default LatestCustomers;
