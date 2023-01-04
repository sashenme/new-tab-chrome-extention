import React from "react";
import TimeSlot from "./TimeSlot";

export default function TimeZones() {
  const favoriteList = [
    {
      id: "1",
      city: "Colombo",
      country_emoji: "🇱🇰",
      timezone: "Asia/Colombo",
    },
    {
      id: "2",
      city: "Melbourne",
      country_emoji: "🇦🇺",
      timezone: "Australia/Melbourne",
    },
    {
      id: "3",
      city: "Vancouver",
      country_emoji: "🇨🇦",
      timezone: "America/Vancouver",
    },
    {
      id: "4",
      city: "Halifax",
      country_emoji: "🇨🇦",
      timezone: "America/Halifax",
    },
    {
      id: "5",
      city: "Singapore",
      country_emoji: "🇸🇬",
      timezone: "Asia/Singapore",
    },
    {
      id: "6",
      city: "Dubai",
      country_emoji: "🇦🇪",
      timezone: "Asia/Dubai",
    },
  ];

  return (
    <div className="text-green-400 flex gap-8 justify-evenly mt-6">
      {favoriteList.map((favorite) => (
        <TimeSlot
          key={favorite.id}
          city={favorite.city}
          timezone={favorite.timezone}
        />
      ))}
    </div>
  );
}
