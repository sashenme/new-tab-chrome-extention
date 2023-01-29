import React,{useEffect, useState} from 'react';
import moment from 'moment-timezone';

const TodaysDate = () => {
  const [tabFocus, setChatFocus] = useState(true);
  useEffect(() => {
    const handleActivityFalse = () => {
        setChatFocus(false);
    };

    const handleActivityTrue = () => {
        setChatFocus(true);
    };

    window.addEventListener('focus', handleActivityTrue);
    window.addEventListener('blur', handleActivityFalse);

    return () => {
        window.removeEventListener('focus', handleActivityTrue);
        window.removeEventListener('blur', handleActivityFalse);
    };
}, [tabFocus]);

  return (
    <div className="text-white text-3xl font-bold">
      {tabFocus && moment().format("dddd, MMMM DD")}
    </div>
  )
}

export default TodaysDate