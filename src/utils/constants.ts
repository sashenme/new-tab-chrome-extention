import { getTimeformat } from './functions';

export const units = [
  { name: "metric",  temperature:"Celsius" },
  { name: "imperial",  temperature:"Fahrenheit" },
];

const showSeconds = false;
const is24 = false;

export const timeFormat = getTimeformat(showSeconds, is24);
export const dateFormat = "YYYY.MM.DD";

export const initialWidgets = { timezones: true, weather: true, todaysDate: true, quickLinks: true, search: true }

export const initialWeather = {unit: units[0].name}