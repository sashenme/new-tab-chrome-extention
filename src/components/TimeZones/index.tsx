import React,{useEffect, useState} from "react";
import TimeSlot from "./TimeSlot";

export default function TimeZones() {
  const favoriteList = [
    {
      id: "1x",
      city: "Uppsala",
      country: "se",
      timezone: "Europe/Stockholm",
    },
    {
      id: "1",
      city: "Colombo",
      country: "lk",
      timezone: "Asia/Colombo",
    },
    {
      id: "2",
      city: "Melbourne",
      country: "au",
      timezone: "Australia/Melbourne",
    },
    {
      id: "3",
      city: "Vancouver",
      country: "ca",
      timezone: "America/Vancouver",
    },
    {
      id: "4",
      city: "Halifax",
      country: "ca",
      timezone: "America/Halifax",
    },
    {
      id: "5",
      city: "Singapore",
      country: "sg",
      timezone: "Asia/Singapore",
    },
    // {
    //   id: "6",
    //   city: "Dubai",
    //   country: "ae",
    //   timezone: "Asia/Dubai",
    // },
  ];

  const [favoriteZones, setFavoriteZones] = useState([]);
  const [grid, setGrid] = useState('');

  useEffect(() => {
    const listener = () => {
      chrome.storage.sync.get(["timezones"], (result) => {
        result.timezones && setFavoriteZones(result.timezones);
        console.log('resut',result)
      })
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    chrome.storage.sync.get(["timezones"], (result) => {
      result.timezones && setFavoriteZones(result.timezones);
    })
  }, []);

  useEffect(()=>{
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
    switch(favoriteZones.length){
      case 1:
        gridClass =  'grid-cols-1';
        break;
      case 2: 
        gridClass =  'grid-cols-1 sm:grid-cols-2';
        break;
      case 3: 
        gridClass =  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        break;
      case 4: 
        gridClass =  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
        break;
      case 5: 
        gridClass =  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
        break;
      default:
        gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
        break;
    }
    setGrid(gridClass)
  },[favoriteZones]);

  return (
    <div className={`grid gap-8 justify-between my-8 ${grid}`}>
      {favoriteZones.map((favorite, index) => (
        <TimeSlot
          key={index}
          city={favorite.city}
          timezone={favorite.value}
          country={favorite.country}
        />
      ))}
    </div>
  );
}
