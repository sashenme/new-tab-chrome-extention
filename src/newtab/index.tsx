import React from "react";
import Background from "../components/Background";
import QuickLinks from "../components/QuickLinks";
import Search from "../components/Search";
import Settings from "../components/Settings";
import Tasks from "../components/Tasks";
import TimeZones from "../components/TimeZones";
import TodaysDate from "../components/TodaysDate";
import Weather from "../components/Weather";

const NewTab = () => {
  return (
    <div>
      <TimeZones/>
      <TodaysDate/>
      <Weather/>
      <Search/>
      <QuickLinks/>
      <Tasks/>
      <Settings/>
      <Background/>
    </div>
  );
};

export default NewTab;
