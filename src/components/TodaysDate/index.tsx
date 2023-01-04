import React from 'react';
import moment from 'moment-timezone';

const TodaysDate = () => {
  return (
    <div className="text-white text-3xl font-bold">
      {moment().format("dddd, MMMM DD")}
    </div>
  )
}

export default TodaysDate