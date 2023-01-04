import React, { useEffect, useState, useRef} from "react";
import moment from "moment-timezone";

interface TimeSlotProps {
  city: string;
  timezone: string;
  country_emoji: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  city,
  timezone,
  country_emoji,
}) => {
  const [timeDiff, setTimeDiff] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("")

  const getTimeDifference = (timezone) => {
    var now: any = moment.utc();
    // get the zone offsets for this time, in minutes
    var guessed = moment.tz.guess();
    var currentTimezone = moment.tz.zone(guessed).utcOffset(now);
    var newTimezone = moment.tz.zone(timezone).utcOffset(now);
    // calculate the difference in hours
    const difference = (currentTimezone - newTimezone) / 60; 

    return difference > 0 ? `+${difference}` : difference;
  };


  var n = useRef(null);
  var t = useRef(null);

  const showSeconds = false;
  const timeFormat = showSeconds ? "hh:mm:ss A" : "hh:mm A" ;
  const dateFormat = "YYYY.MM.DD"

  useEffect(() => {
    setTimeDiff(getTimeDifference(timezone));
    const now =moment.tz(moment(), timezone); 
    setTime(now.format(timeFormat))
    setDate(now.format(dateFormat));
    const timeOffset = 1000 - new Date(Date.now()).getMilliseconds();
    
    n.current = setTimeout(() => {
      t.current = setInterval(() => {
        setTime(moment.tz(moment(), timezone).format(timeFormat))
      });
    }, timeOffset);

    return function cleanup() {
      n.current = null;
      clearInterval(t.current);
    };

  }, [timezone]);

  return (
    <div className="text-center text-white bg-gradient-to-bl from-slate-300/30 to-slate-100/10 px-6 py-4 rounded-md backdrop-blur-sm border-solid border border-white/20">
      <h2 className="text-2xl opacity-70 mb-1">
        {country_emoji} {city}
      </h2>
      <h1 className="text-4xl font-bold">{time}</h1>
      <div className="text-sm">{date} {timeDiff}</div>
    </div>
  );
};

export default TimeSlot;
