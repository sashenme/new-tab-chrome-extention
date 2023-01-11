import React from "react";
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 justify-between my-8">
      {favoriteList.map((favorite) => (
        <TimeSlot
          key={favorite.id}
          city={favorite.city}
          timezone={favorite.timezone}
          country={favorite.country}
        />
      ))}
    </div>
  );
}
