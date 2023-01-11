import React, { useState, useEffect } from "react";
import { openWeatherApi } from "../../utils/apis";
import { units } from "../../utils/constants";
// import { unit } from "../../utils/constants";
import { getWeatherIcon, weatherApiUrl } from "../../utils/functions";

interface Main {
  feels_like: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface WeatherResponse {
  main: Main;
  weather: any;
}

interface currentWeather {
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  main: string;
}

interface Location {
  lat: number;
  long: number;
}

const unit = { name: "metric", temperature: "°C", label: "Celsius" };

const initialData = {
  currentWeather: {
    temp: 0,
    feels_like: 0,
    description: "snowing",
    icon: "03d",
    main: "",
  },
};

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<currentWeather>(
    initialData.currentWeather
  );
  const [location, setLocation] = useState<Location>({ lat: 0, long: 0 });
  const initialUrl = weatherApiUrl(location.lat, location.long, 'metric');
  const [url, setUrl] = useState(initialUrl);
  const [weatherSettings, setWeatherSettings] = useState({unit:'metric'});

  async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  }

  const roundUpTemp = (temp: number) => {
    const rounded = Number(temp).toFixed(0);
    return rounded === "-0" ? 0 : rounded;
  };
  const getWeather = async () => {
    try {
      if (location.lat === 0 || location.long === 0 ) {
        return;
      }
      const data: WeatherResponse = await http(weatherApiUrl(location.lat, location.long, weatherSettings.unit));
      const { temp, feels_like } = data.main;
      const { description, main, icon } = data.weather[0];
      setCurrentWeather({
        temp,
        feels_like,
        description,
        icon,
        main,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWeather(); 
  }, [location, url, weatherSettings]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      setUrl(
        weatherApiUrl(
          position.coords.latitude,
          position.coords.longitude,
          weatherSettings.unit
        )
      );
    });
  }, []);

  useEffect(() => { 
    
  }, [weatherSettings]);

  const getUnitChar = () =>{
  let char:string;
   units.filter(unit => unit.name === weatherSettings.unit).map(unit => {char = unit.temperature.substring(0,1)})
   return (<span>&deg;{char}</span>);
  }

  useEffect(() => {
    const listener = () => {
      chrome.storage.sync.get(["weather"], (result) => {
        if(result.weather){          
        setWeatherSettings(result.weather);
        setUrl(weatherApiUrl(location.lat, location.long, result.weather))
        }
      })
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(["weather"], (result) => {
      if(result.weather){          
        setWeatherSettings(result.weather);
        setUrl(weatherApiUrl(location.lat, location.long, result.weather))
        }
    })
  }, []);

  return (
    <div className="flex gap-6 my-4 items-center">
      <div className="flex items-center gap-4">
        <img
          src={`img/icons/${getWeatherIcon(currentWeather.icon)}.svg`}
          alt=""
          className="w-8"
        />
        <div className="text-4xl text-white font-bold flex">
          <span>{`${roundUpTemp(currentWeather.temp)}`}</span>
          <span className="text-2xl">{getUnitChar()}</span>
        </div>
      </div>
      <div>
        <div className="text-white text-xl capitalize">
          {currentWeather.description}
        </div>
        <div className="text-xs text-white/80 uppercase">
          {`Feels like ${currentWeather.feels_like}`}{getUnitChar()}
        </div>
      </div>
    </div>
  );
};

export default Weather;
