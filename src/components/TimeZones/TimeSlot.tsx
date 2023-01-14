import React, { useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import { dateFormat, timeFormat } from "../../utils/constants";
import { countryImgApi } from "../../utils/apis";

interface TimeSlotProps {
  city: string;
  timezone: string;
  country: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ city, timezone, country }) => {
  const [timeDiff, setTimeDiff] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const n = useRef(null);
  const t = useRef(null);

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000 * 60).toISOString().substring(11, 11 + 5);
  };

  const getTimeDifference = (timezone) => {
    const now: any = moment.utc(); 
    const guessed = moment.tz.guess();
    const currentTimezone = moment.tz.zone(guessed).utcOffset(now);
    const newTimezone = moment.tz.zone(timezone).utcOffset(now); 
    const difference = currentTimezone - newTimezone;  
    return difference > 0
      ? `+${formatDuration(difference)}`
      : `-${formatDuration(difference * -1)}`;
  };

  const getTheDay = (date) => {
    const yesterday = moment().subtract(1, "days").format(dateFormat);
    const today = moment().format(dateFormat);
    const tomorrow = moment().add(1, "days").format(dateFormat);

    switch (date) {
      case today:
        return "Today";
      case tomorrow:
        return "Tomorrow";
      case yesterday:
        return "Yesterday";
      default:
        return "NaN";
    }
  };

  useEffect(() => {
    setTimeDiff(getTimeDifference(timezone));
    const now = moment.tz(moment(), timezone);
    const timeZoneDate = now.format(dateFormat);
    const timeOffset = 1000 - new Date(Date.now()).getMilliseconds();

    setTime(now.format(timeFormat));
    setDate(getTheDay(timeZoneDate));

    n.current = setTimeout(() => {
      t.current = setInterval(() => {
        setTime(moment.tz(moment(), timezone).format(timeFormat));
      });
    }, timeOffset);

    return function cleanup() {
      n.current = null;
      clearInterval(t.current);
    };
  }, [timezone]);

  return (
    <div className="text-center text-white bg-gradient-to-bl from-slate-300/30 to-slate-100/10 px-6 py-4 rounded-md backdrop-blur-sm border-solid border border-white/20">
      <div className="text-2xl  mb-1 flex gap-2 items-center justify-center">
        <img
          src={`${countryImgApi}/${country}`}
          crossOrigin="anonymous"
          alt=""
          className="h-4"
        />
        <span className="opacity-70">{city}</span>
      </div>
      <h1 className="text-4xl font-bold">{time}</h1>
      <div className="text-sm">
        {date}, {timeDiff === '-00:00' ? '0' : timeDiff}<small className="text-[10px]"> HRS</small>
      </div>
    </div>
  );
};

export default TimeSlot;
