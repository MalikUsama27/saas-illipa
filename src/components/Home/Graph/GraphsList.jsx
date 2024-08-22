import React, { useEffect,useState  } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css'; 

import blue from '../../../assets/Graphs/blue.svg';
import yellow from '../../../assets/Graphs/yellow.svg';
import purple from '../../../assets/Graphs/purple.svg';
import green from '../../../assets/Graphs/green.svg';

const GraphsList = () => {
    console.log(process.env.REACT_APP_API_BASE_URL,'888');
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
                setTotalUsers(response.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const graphsData = [
        {
            icon: 'pi pi-users',
            value: totalUsers.toString(),
            title: 'Customers Signed Up',
            bgImage: blue,
            iconColor: '#007bff'
        },
        {
            icon: 'pi pi-dollar',
            value: '532',
            title: 'Revenue',
            bgImage: yellow,
            iconColor: '#FFA500'
        },
        {
            icon: 'pi pi-users',
            value: '12',
            title: 'Premium Users',
            bgImage: green,
            iconColor: '#28a745'
        },
        {
            icon: 'pi pi-comments',
            value: '440',
            title: 'Queries',
            bgImage: purple,
            iconColor: '#6f42c1'
        }
    ];

    return (
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '1rem 0' }}>
            {graphsData.map((data, index) => (
                <Card key={index} 
                    style={{
                        flex: '1', 
                        minWidth: '240px',
                        backgroundColor: '#fff', 
                        borderRadius: '15px', 
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: "30px", paddingTop: '-10%' }}>
                        <i className={data.icon} style={{ fontSize: '2.2rem', color: data.iconColor }}></i>
                        <div style={{ marginLeft: '1rem' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: data.iconColor }}>{data.title}</div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: data.iconColor }}>{data.value}</div>
                        </div>
                    </div>
                    <img 
                        src={data.bgImage} 
                        alt="" 
                        style={{
                            position: 'absolute',
                            bottom: '-10px',
                            right: '-10px',
                            width: '110%',
                            height: '50%'
                        }} 
                    />
                </Card>
            ))}
        </div>
    );
};

export default GraphsList;
