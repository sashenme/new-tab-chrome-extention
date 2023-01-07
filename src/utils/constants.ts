import {getTimeformat} from './functions';

export const unit = { name: "metric", temperature: "°C" };
const showSeconds = false;
const is24 = false;

export const timeFormat = getTimeformat(showSeconds, is24);
export const dateFormat = "YYYY.MM.DD";