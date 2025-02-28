
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function BarChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Threshold 1',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [50, 25, 12, 48, 90, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Threshold 2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34]
                },
                {
                    type: 'bar',
                    label: 'Threshold 3',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                },
                {
                    type: 'bar',
                    label: 'Threshold 4',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                },
                {
                    type: 'bar',
                    label: 'Threshold 5',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card" style={{width:'49%',height:'49%'}}>
            <h3>Revenue vs Months</h3>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        