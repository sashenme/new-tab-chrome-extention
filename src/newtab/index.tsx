import React, { useEffect, useState} from "react";
import Background from "../components/Background";
import QuickLinks from "../components/QuickLinks";
import Search from "../components/Search";
import Settings from "../components/Settings";
import Tasks from "../components/Tasks";
import TimeZones from "../components/TimeZones";
import TodaysDate from "../components/TodaysDate";
import Weather from "../components/Weather";

const NewTab = () => {
  const [widgets, setWidgets] = useState({timezones: true})
  useEffect(() => {
    chrome.storage.sync.get(["widgets"]).then((result) => {
      result.widgets && setWidgets(result.widgets) 
    }).catch((e)=>{
      console.log(e)
    });
  }, [widgets]);
  return (
    <div className="max-w-[1620px] mx-auto p-4  font-sans">
    {widgets.timezones && <TimeZones />} 
      <div className="grid md:grid-cols-2 mt-20 gap-40">
        <div>
          <TodaysDate />
          <Weather />
          <Search />
          <QuickLinks />
        </div>
        <div>
          <Tasks />
        </div>
      </div>
      <Settings />
      <Background />
    </div>
  );
};

export default NewTab;
