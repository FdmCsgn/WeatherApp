import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Search from '../assets/icons/Search';
import { useStateContext } from '../Context';
import { BackgroundLayout, WeatherCard, ApiCard, LocationCard, WeatherCard2, HistoricalData, HistoricalData2, HistoricalDataMonth, HistoricalDataMonth2, WeatherCard3, HistoricalData3 , HistoricalDataMonth3,Map, BasicMenu, SignUp, Communication} from '../Components/';
import { Routes, Route } from 'react-router-dom';
import Season from '../assets/icons/season.png';
import { Link } from "react-router-dom";



function WeatherApp() {
  const [weatherDataAPI, setWeatherDataAPI] = useState(null);
  const [locationAPI, setLocationAPI] = useState('');
  const { weatherData7001, weatherData7002,weatherData7003, thisLocation } = useStateContext();

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const location = locationAPI || 'Antalya';
        const response = await axios.get(`http://localhost:3000/weather?q=${location}`);
        setWeatherDataAPI(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAPI();
  }, [locationAPI]);

  const handleLocationChange = (event) => {
    setLocationAPI(event.target.value);
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2 search' >
          <Search />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setLocationAPI(e.target.value);
              }
            }}
            type="text"
            placeholder='Şehir Ara'
            className='focus-outline-none w-full text-[#212121] text-lg'
            value={locationAPI}
            onChange={handleLocationChange}
          />
        </div>
      </nav>
      <BackgroundLayout />

      <Routes>
        <Route
          path='/'
          element={
            <>
              <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center '>
                <LocationCard place={locationAPI || 'Antalya-Türkiye'} />
              </main>
              <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                {weatherData7001 && (
                  <WeatherCard 
                    temperature={weatherData7001.LocalTemperature}
                    humidity={weatherData7001.LocalHumidity}
                    tempChange={weatherData7001.LocalTempChange}
                    humChange={weatherData7001.LocalHumChange}
                    ItemDate={weatherData7001.ItemDate}
                  />
                )}
                {locationAPI !== 'Antalya' ? (
                  weatherDataAPI && (
                    <ApiCard
                      ExternalTemperature={weatherDataAPI.current.temp_c}
                      ExternalHumidity={weatherDataAPI.current.humidity}
                      ExternalWind={weatherDataAPI.current.wind_kph}
                      ExternalPressure={weatherDataAPI.current.pressure_in}
                      conditions={weatherDataAPI.current.condition.text}
                      ItemDate={weatherDataAPI.location.localtime}
                    />
                  )
                ) : (
                  weatherData7002 && (
                    <ApiCard
                      ExternalTemperature={weatherData7002.ExternalTemperature}
                      ExternalHumidity={weatherData7002.ExternalHumidity}
                      ExternalWind={weatherData7002.ExternalWind}
                      ExternalPressure={weatherData7002.ExternalPressure}
                      conditions={weatherData7002.Weather}
                      ItemDate={weatherData7002.ItemDate}
                    />
                  )
                )}
                {
                  weatherData7002 && (
                    <WeatherCard2
                      temperature2={weatherData7002.LocalTemperature}
                      humidity2={weatherData7002.LocalHumidity}
                      tempChange2={weatherData7002.LocalTempChange}
                      humChange2={weatherData7002.LocalHumChange}
                      ItemDate2={weatherData7002.ItemDate}
                    />
                  )
                }
                 {
                  weatherData7003 && (
                    <WeatherCard3
                      temperature3={weatherData7003.LocalTemperature}
                      humidity3={weatherData7003.LocalHumidity}
                      tempChange3={weatherData7003.LocalTempChange}
                      humChange3={weatherData7003.LocalHumChange}
                      ItemDate3={weatherData7003.ItemDate}
                    />
                  )
                }
              </main>
            </>
          }
        />
        <Route path='/HistoricalData' element={<HistoricalData />} />
        <Route path='/HistoricalData2' element={<HistoricalData2 />} />
        <Route path='/HistoricalDataMonth' element={<HistoricalDataMonth />} />
        <Route path='/HistoricalDataMonth2' element={<HistoricalDataMonth2 />} />
        <Route path='/HistoricalData3' element={<HistoricalData3/>} />
        <Route path='/HistoricalDataMonth3' element={<HistoricalDataMonth3 />} />
        <Route path='/Map' element={<Map />} />
        <Route path='/SignUp' element={<SignUp />} />

      </Routes>
      <Communication/>
    </div>
  );
}

export default WeatherApp;
