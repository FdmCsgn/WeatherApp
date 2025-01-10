import React, { useEffect, useState } from "react";
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import windy from '../assets/icons/windy.png';
import '../index.css';

const getIcon = (conditions) => {
    const weatherCondition = conditions.toLowerCase();
    if (weatherCondition.includes('partly cloudy')) {
        return cloud;
    } else if (weatherCondition.includes('fog')) {
        return fog;
    } else if (weatherCondition.includes('snow')) {
        return snow;
    } else if (weatherCondition.includes('thunder')) {
        return storm;
    } else if (weatherCondition.includes('rain')) {
        return rain;
    } else if (weatherCondition.includes('wind')) {
        return windy;
    } else {
        return sun;
    }
};

const ApiCard = ({ ExternalTemperature, ExternalPressure, ExternalHumidity, ExternalWind, conditions,ItemDate}) => {
    const [icon, setIcon] = useState(sun);

    useEffect(() => {
        if (conditions) {
            setIcon(getIcon(conditions));
        }
    }, [conditions]);

    if (!ExternalTemperature) return <div>Loading...</div>;

    const convertToIstanbulTime = (dateString) => {
        const utcDate = new Date(dateString); // UTC tarihini al
        utcDate.setHours(utcDate.getHours()); // İstanbul saatine 3 saat ekle
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return utcDate.toLocaleString('tr-TR', options); // İstanbul saatine çevir
    };

    return (
        <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-3">
            <div className="flex w-full justify-center items-center gap-4 mt-4 mb-4">
                <img  src={icon} alt="Weather icon" className="w-[6rem]"/>
                <p className="font-bold text-5xl flex justify-center items-center">{ExternalTemperature} &deg; C</p>
            </div>
            <div className="w-full  flex justify-center items-center text-4xl font-semibold mb-4 ">
                {conditions || 'Conditions not available'}
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <p className="text-center p-2 text-2xl">Latest Data:</p>
                <p className="text-center p-2 text-2xl">{convertToIstanbulTime(ItemDate)}</p>
            </div>
            <div className="w-full flex justify-between items-center degree  gap-4">
                <p className="flex-1 text-center font-bold p-2 ApiCardColor shadow rounded-lg">
                    Humidity <span className="font-normal">{ExternalHumidity}%</span>
                </p>
            </div>
            <div className="w-full flex justify-between items-center degree gap-4">
                <p className="flex-1 text-center p-2 font-bold rounded-lg ApiCardColor">
                    Wind <span className="font-normal">{ExternalWind}km/h</span>
                </p>
            </div>
            <div className="w-full flex justify-between items-center degree gap-4">
                <p className="flex-1 text-center font-bold p-2 ApiCardColor shadow rounded-lg">
                    Pressure <span className="font-normal">{ExternalPressure}hPa</span>
                </p>
            </div>
        </div>
    );
};

export default ApiCard;
