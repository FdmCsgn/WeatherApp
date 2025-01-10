import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { Link } from "react-router-dom";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const HistoricalData = () => {
    const [data, setData] = useState([]);
    const [mainIDData, setMainIDData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/data');
                const fetchedData = response.data;
                console.log('Fetched Data:', fetchedData); // Verileri kontrol etmek için
                setData(fetchedData);
                
                // MainID'ye göre gruplama
                const groupedData = fetchedData.reduce((acc, item) => {
                    if (!acc[item.MainID]) {
                        acc[item.MainID] = [];
                    }
                    acc[item.MainID].push(item);
                    return acc;
                }, {});
                console.log('Grouped Data by MainID:', groupedData); // Gruplanmış veriyi kontrol etmek için
                setMainIDData(groupedData);
            } catch (error) {
                console.error('Veri çekme hatası:', error);
            }
        };

        fetchData();
    }, []);

    const getChartData = (mainID) => {
        const filteredData = mainIDData[mainID] || [];
        console.log(`Filtered Data for MainID ${mainID}:`, filteredData); // Filtrelenmiş veriyi kontrol etmek için

        return {
            labels: filteredData.map(item => {
                const utcDate = new Date(item.ItemDate); 
                utcDate.setHours(utcDate.getHours() - 3); // utc saatine iki yerde çevirdiğimiz için -3 ekliyoruz
                const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                return utcDate.toLocaleString('tr-TR', options); 
            }),
            datasets: [
                {
                    label: 'Sıcaklık',
                    data: filteredData.map(item => item.LocalTemperature),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Nem',
                    data: filteredData.map(item => item.LocalHumidity),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                }
            ]
        };
    };

    return (
        <div>
            <div>
                <h2 className='text'>Device 1</h2>
            </div>

            {Object.keys(mainIDData).map(mainID => (
                mainID === '7001' && (
                    <div key={mainID} className='glassCardData'>
                        <Line data={getChartData(mainID)} />
                    </div>
                )
            ))}

            <div>
               <Link to={`/HistoricalDataMonth`} className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded button">View Monthly Data</Link>
            </div>
        </div>
    );
};

export default HistoricalData;
