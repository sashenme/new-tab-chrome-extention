import { getTimeformat } from './functions';

export const unit = { name: "metric", temperature: "°C", label:"Celsius" };

const showSeconds = false;
const is24 = false;

export const timeFormat = getTimeformat(showSeconds, is24);
export const dateFormat = "YYYY.MM.DD";

export const initialWidgets = { timezones: true, weather: true, todaysDate: true, quickLinks: true, search: true }