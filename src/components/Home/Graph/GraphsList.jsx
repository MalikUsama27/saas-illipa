import React from 'react';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css'; // PrimeReact Icons

import blue from '../../../assets/Graphs/blue.svg';
import yellow from '../../../assets/Graphs/yellow.svg';
import purple from '../../../assets/Graphs/purple.svg';
import green from '../../../assets/Graphs/green.svg';

const GraphsList = () => {
    const graphsData = [
        {
            icon: 'pi pi-users',
            value: '3882',
            title: 'Customers Signed Up',
            bgImage: blue,
            iconColor: '#007bff'
        },
        {
            icon: 'pi pi-map',
            value: '532',
            title: 'Revenue',
            bgImage: yellow,
            iconColor: '#FFA500'
        },
        {
            icon: 'pi pi-directions',
            value: '12.6%',
            title: 'Premium Users',
            bgImage: green,
            iconColor: '#28a745'
        },
        {
            icon: 'pi pi-comments',
            value: '440',
            title: 'Free Users',
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
