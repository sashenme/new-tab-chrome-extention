import React, { useState, useEffect } from "react";
import { openWeatherApi, openWeatherImg } from "../../utils/apis";
import { unit } from "../../utils/constants";

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

const Weather = () => {
  const [error, setError] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    temp: 1,
    feels_like: 1,
    description: "snowing",
    icon: "03d",
  });

  const [location, setLocation] = useState({ lat: 0, long: 0 });
  let [url, setUrl] = useState(
    `${openWeatherApi}&lat=${location.lat}&lon=${location.long}&units=${unit.name}`
  );

  async function http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  }

  const getWeatherIcon = (icon) => {
    let iconName = "";

    switch (icon) {
      case "01d":
        iconName = "clean-day";
        break;
      case "01n":
        iconName = "clean-night";
        break;
      case "02d":
        iconName = "partly-cloudy-day";
        break;
      case "02n":
        iconName = "partly-cloudy-night";
        break;
      case "03d":
        iconName = "cloud";
        break;
      case "03n":
        iconName = "cloud";
        break;
      case "04d":
        iconName = "doublecloud";
        break;
      case "04n":
        iconName = "doublecloud";
        break;
      case "09d":
        iconName = "shower-rain";
        break;
      case "09n":
        iconName = "shower-rain";
        break; 
      case "10d":
        iconName = "rain-day";
        break;
      case "10n":
        iconName = "rain-night";
        break; 
      case "11d":
        iconName = "thunder-rain";
        break; 
      case "11n":
        iconName = "thunder-rain";
        break; 
      case "13d":
        iconName = "snow";
        break; 
      case "13n":
        iconName = "snow";
        break; 
      case "50d":
        iconName = "hazzy";
        break; 
      case "50n":
        iconName = "hazzy";
        break; 
      default:
        iconName = "cloud";
    }
 
    return iconName;
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        if (location.lat === 0 || location.long === 0) {
          return;
        }
        const data: WeatherResponse = await http(url);
        const { temp, feels_like } = data.main;
        const { description, main, icon } = data.weather[0];
        setCurrentWeather({
          temp,
          feels_like,
          description,
          icon,
        });
      } catch (e) {
        setError(true);
        console.log(e);
      }
    };
    getWeather();
  }, [url, location]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      setUrl(
        `${openWeatherApi}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit.name}`
      );
    });
  }, []);

  return (
    <div className="flex gap-6 my-4 items-center">
      <div className="flex items-center gap-4">
        <img src={`img/icons/${getWeatherIcon(currentWeather.icon)}.svg`} alt="" className="w-8" />
        <div className="text-4xl text-white font-bold flex">
          <span>{`${Number(currentWeather.temp).toFixed(0)}`}</span>
          <span className="text-2xl">{unit.temperature}</span>
        </div>
      </div>
      <div>
        <div className="text-white text-xl capitalize">
          {currentWeather.description}
        </div>
        <div className="text-xs text-white/80 uppercase">
          {`Feels like ${currentWeather.feels_like}${unit.temperature}`}
        </div>
      </div>
    </div>
  );
};

export default Weather;
