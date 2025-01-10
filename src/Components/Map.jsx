import {
    MapContainer,
    TileLayer,
    Marker,
    CircleMarker,
    Popup,
  } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import WeatherCard from "./WeatherCard";
  import { useStateContext } from '../Context/index';
   
  function Map() {
    const { weatherData7001, weatherData7002,weatherData7003 } = useStateContext();

     if (!weatherData7001 && !weatherData7002 && !weatherData7003) {
      return <div>Loading...</div>;
    }
  
    // Veriler mevcutsa, LocalTemperature ve LocalHumidity verilerini ayıklayın
    const { LocalTemperature: LocalTemperature1, LocalHumidity: LocalHumidity1,  } = weatherData7001;
    const { LocalTemperature: LocalTemperature2, LocalHumidity: LocalHumidity2,  } = weatherData7002;
    const { LocalTemperature: LocalTemperature3, LocalHumidity: LocalHumidity3,  } = weatherData7003;



    return (
      <main className="d z-1 mt-12">
        {/*leaflet and react-leaflet*/}
        <div>
          <MapContainer center={[36.89596236326054, 30.712608998352838]} zoom={5}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
  
            <CircleMarker
              className="n w-[100px] h-[10px]"
              center={[36.89596236326054, 30.712608998352838]}
              radius={10}
              color="transparent"
              fillColor="green"
              fillOpacity={0.5}
            >
              <Popup className="w-[460px] h-[150px]">
                <p className="text-[25px]">Device 1</p>
                <p className="text-[25px]">{LocalTemperature1} &deg; C</p>
                <p className="text-[25px]">{LocalHumidity1}%</p>
              </Popup>
            </CircleMarker>
            <CircleMarker
              className="n w-[100px] h-[10px]"
              center={[36.89227281603377, 30.7316849347558]}
              radius={10}
              color="transparent"
              fillColor="red"
              fillOpacity={0.5}
            >
              <Popup className="w-[460px] h-[150px]">
                <p className="text-[25px]">Device 2</p>
                <p className="text-[25px]">{LocalTemperature2} &deg; C</p>
                <p className="text-[25px]">{LocalHumidity2}%</p>
              </Popup>
            </CircleMarker>
            <CircleMarker
              className="n w-[100px] h-[10px]"
              center={[36.89982239277184, 30.691891902399966]}
              radius={10}
              color="transparent"
              fillColor="blue"
              fillOpacity={0.5}
            >
              <Popup className="w-[460px] h-[150px]">
                <p className="text-[25px]">Device 3</p>
                <p className="text-[25px]">{LocalTemperature3} &deg; C</p>
                <p className="text-[25px]">{LocalHumidity3}%</p>
              </Popup>
            </CircleMarker>
          </MapContainer>
        </div>
      </main>
    );
  }
  
  export default Map;
  