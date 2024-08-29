import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Industry() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Healthcare', 'Finance', 'Manufacturing','Retail','Technology','Education'],
            datasets: [
                {
                    data: [70, 325, 902,306,100,508],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--purple-500'), 
                        documentStyle.getPropertyValue('--orange-500'), 
                        documentStyle.getPropertyValue('--pink-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--purple-400'), 
                        documentStyle.getPropertyValue('--orange-400'), 
                        documentStyle.getPropertyValue('--pink-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center" style={{width:'41%',height:'43%'}}>
            <h2>Industries</h2>
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}