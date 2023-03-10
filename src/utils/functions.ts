import { openWeatherApi } from "./apis";

export const getWeatherIcon = (icon) => {
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
      iconName = "rainy-day";
      break;
    case "10n":
      iconName = "rainy-night";
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

export const getTimeformat = (hasSeconds, is24) => {
  let timeFormat;

  if(is24 && hasSeconds){
    timeFormat = 'HH:mm:ss'
  }else if(!is24 && hasSeconds){
    timeFormat = 'hh:mm:ss A'
  }else{
    timeFormat = 'hh:mm A'
  }
  return timeFormat;
}
 
export const weatherApiUrl = (lat: number,long:number, unit:string) => {
  return `${openWeatherApi}&lat=${lat}&lon=${long}&units=${unit}`;
}