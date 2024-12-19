// src/components/StatsPage.js

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatsPage = ({ visitors }) => {
    const [showImages, setShowImages] = useState(false);
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [showCodeButton, setShowCodeButton] = useState(false);

    const totalVisitors = visitors.length;
    const totalIncome = visitors.reduce((sum, visitor) => sum + visitor.price, 0);
    const totalCO2 = visitors.reduce((sum, visitor) => {
        let co2 = 0;
        switch (visitor.transportation) {
            case 'car':
                co2 = visitor.distance * 0.2;
                break;
            case 'motorcycle':
                co2 = visitor.distance * 0.1;
                break;
            case 'bus':
                co2 = visitor.distance * 0.05;
                break;
            default:
                co2 = 0;
        }
        return sum + co2;
    }, 0);

    const transportationCounts = visitors.reduce((counts, visitor) => {
        counts[visitor.transportation] = (counts[visitor.transportation] || 0) + 1;
        return counts;
    }, {});

    const transportationPercentages = Object.keys(transportationCounts).reduce((percentages, key) => {
        percentages[key] = ((transportationCounts[key] / totalVisitors) * 100).toFixed(2);
        return percentages;
    }, {});

    const chartData = {
        labels: Object.keys(transportationCounts),
        datasets: [
            {
                label: 'CO2 Emission by Transportation Type',
                data: Object.keys(transportationCounts).map(key => {
                    let co2 = 0;
                    visitors.forEach(visitor => {
                        if (visitor.transportation === key) {
                            switch (visitor.transportation) {
                                case 'car':
                                    co2 += visitor.distance * 0.2;
                                    break;
                                case 'motorcycle':
                                    co2 += visitor.distance * 0.1;
                                    break;
                                case 'bus':
                                    co2 += visitor.distance * 0.05;
                                    break;
                                default:
                                    co2 += 0;
                            }
                        }
                    });
                    return co2;
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'CO2 Emission by Transportation Type',
                color: '#333',
                font: {
                    size: 16,
                }
            },
            legend: {
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'CO2 Emission (kg)',
                    color: '#333',
                    font: {
                        size: 14,
                    }
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    }
                }
            },
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    }
                }
            }
        }
    };

    const handleCreateProjection = () => {
        setShowProgress(true);
        setProgress(0);
        setShowCodeButton(false);
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 10;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, 1000);

        setTimeout(() => {
            const imageFiles = [
                "https://i.ibb.co/8XHKG4S/Affluenzapersone.jpg",
                "https://i.ibb.co/C2KgkdT/Risultatoprevisione.jpg"
            ];
            setImages(imageFiles);
            setShowImages(true);
            setShowProgress(false);
            setShowCodeButton(true);
        }, 10000);
    };

    useEffect(() => {
        if (progress === 100) {
            setShowProgress(false);
        }
    }, [progress]);

    const handleViewCode = () => {
        window.open("https://eu-de.dataplatform.cloud.ibm.com/analytics/notebooks/v2/65b27470-5f65-436e-ad48-ea1d0b7c0fda/view?access_token=c5e37bdfcc255aa89164ee6224b4e677b5157ae6b3c75cf05b41f57cc523edaa&context=cpdaas", "_blank");
    };

    return (
        <div className="stats-page">
            <h2>Event Statistics</h2>
            <div className="summary">
                <p>Total Visitors: {totalVisitors}</p>
                <p>Total Income: €{totalIncome}</p>
                <p>Total CO2 Emitted: {totalCO2.toFixed(2)} kg</p>
            </div>

            <h3>Visitor Details</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Transportation</th>
                            <th>Distance (km)</th>
                            <th>Ticket Price (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(visitor => (
                            <tr key={visitor.id}>
                                <td>{visitor.id}</td>
                                <td>{visitor.transportation} ({transportationPercentages[visitor.transportation]}%)</td>
                                <td>{visitor.distance}</td>
                                <td>{visitor.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>

            {showProgress && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            <button className="create-projection-button" onClick={handleCreateProjection}>
                Create Projection
            </button>

            {showCodeButton && (
                <button className="view-code-button" onClick={handleViewCode}>
                    View the code
                </button>
            )}

            {showImages && (
                <div className="images-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="event-image"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatsPage;
