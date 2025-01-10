import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import "react-datepicker/dist/react-datepicker.css";
import MonthButton from '../Components/MonthButton'; 

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const HistoricalDataMonth = () => {
    const [data, setData] = useState([]);
    const [mainIDData, setMainIDData] = useState({});
    const [date, setDate] = useState(null); // Tarih seçimi için state ekledik

    const fetchData = async (selectedMonth) => {
        try {
            const response = await axios.get('http://localhost:3003/api/data');
            const fetchedData = response.data;
            console.log('Fetched Data:', fetchedData); // Verileri kontrol etmek için
            setData(fetchedData);

            // Seçilen aya göre verileri filtreleme
            const filteredData = fetchedData.filter(item => {
                const itemDate = new Date(item.ItemDate);
                return itemDate.getMonth() === selectedMonth.getMonth() && itemDate.getFullYear() === selectedMonth.getFullYear();
            });

            // MainID'ye göre gruplama
            const groupedData = filteredData.reduce((acc, item) => {
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

    useEffect(() => {
        if (date) {
            fetchData(date); // Seçilen ayı fetchData fonksiyonuna geçiriyoruz
        }
    }, [date]);

    const getChartData = (mainID) => {
        const filteredData = mainIDData[mainID] || [];
        console.log(`Filtered Data for MainID ${mainID}:`, filteredData); // Filtrelenmiş veriyi kontrol etmek için

        // Tarihe göre sıralama
        const sortedData = filteredData.sort((a, b) => new Date(a.ItemDate) - new Date(b.ItemDate));

        return {
            labels: sortedData.map(item => {
                const utcDate = new Date(item.ItemDate); 
                utcDate.setHours(utcDate.getHours() - 3); 
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; 
                return utcDate.toLocaleDateString('tr-TR', options); 
            }),
            datasets: [
                {
                    label: 'Sıcaklık',
                    data: sortedData.map(item => item.AvgLocalTemperature),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Nem',
                    data: sortedData.map(item => item.AvgLocalHumidity),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                }
            ]
        };
    };

    return (
        <div className='mt-5'>
            <MonthButton onDateChange={setDate}  />
            <h1 className='text'>Average of Monthly Data of Device 1</h1>
            {Object.keys(mainIDData).map(mainID => (
                mainID === '7001' && (
                    <div key={mainID} className='glassCardData'>
                        <Line data={getChartData(mainID)} />
                    </div>
                )
            ))}
        </div>
    );
};

export default HistoricalDataMonth;
