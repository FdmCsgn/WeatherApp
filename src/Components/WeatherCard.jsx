import React, { useState } from "react";
import sun from '../assets/icons/sun.png';
import '../index.css';
import { Link } from "react-router-dom";
import { useStateContext } from '../Context/index';

const WeatherCard = ({ temperature, humidity, tempChange, humChange, ItemDate }) => {
    const [icon, setIcon] = useState(sun);
    const { weatherData7001, thisLocation } = useStateContext();
    

    if (temperature === undefined || temperature === null) return <div>Loading...</div>;


    const convertToIstanbulTime = (dateString) => {
        const utcDate = new Date(dateString); 
        utcDate.setHours(utcDate.getHours() - 3); 
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return utcDate.toLocaleString('tr-TR', options); 
    };
    
       return (
         <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-3">
            <div>
                <h1 className="text">Device 1</h1>
            </div>
            <div className="flex w-full justify-center items-center gap-4 mt-3 mb-4">
                <p className="font-bold text-5xl flex justify-center items-center">{temperature} &deg; C</p>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <p className="text-center p-2 text-2xl">Latest Data:</p>
                <p className="text-center p-2 text-2xl">{convertToIstanbulTime(ItemDate)}</p>
            </div>
            <div className="w-full flex justify-between items-center degree gap-4">
                <p className="flex-1 text-center font-bold p-2 WeatherCardColor shadow rounded-lg">
                    Humidity <span className="font-normal">{humidity}%</span>
                </p>
            </div>
            <div className="w-full flex justify-between items-center degree gap-4">
                <p className="flex-1 text-center p-2 font-bold rounded-lg WeatherCardColor">
                    HumChange <span className="font-normal">{humChange}%</span> 
                </p>
            </div>
            <div className="w-full flex justify-between items-center degree gap-4">
                <p className="flex-1 text-center p-2 font-bold rounded WeatherCardColor ">
                    TempChange <span className="font-normal">{tempChange}%</span> 
                </p>
            </div>
            <div>
                <Link to={`/HistoricalData`} className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded button">View Historical Data</Link>
            </div>
          </div>
        );
};

export default WeatherCard;
