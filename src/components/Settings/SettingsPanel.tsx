import React, { useState, useEffect } from "react";
import { initialWidgets } from "../../utils/constants";
import QuickLinks from "./Sections/QuickLinks";
import Search from "./Sections/Search";
import TodaysDate from "./Sections/TodaysDate";
import Weather from "./Sections/Weather";
import Timezones from "./Sections/Timezones";
import Header from "./Sections/Header";

interface SettingsPanelProps {
  isPanelOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isPanelOpen,
}) => {
  const [widgets, setWidgets] = useState(initialWidgets);

  const toggleTimezones = () => {
    setWidgets({ ...widgets, timezones: !widgets.timezones });
  };

  const toggleTodaysDate = () => {
    setWidgets({ ...widgets, todaysDate: !widgets.todaysDate });
  };

  const toggleWeather = () => {
    setWidgets({ ...widgets, weather: !widgets.weather });
  };

  const toggleSearch = () => {
    setWidgets({ ...widgets, search: !widgets.search });
  };

  const toggleQuickLinks = () => {
    setWidgets({ ...widgets, quickLinks: !widgets.quickLinks });
  };

  const handleSave = () => {
    chrome.storage.sync.set({ widgets: widgets }, () => {
      console.log(widgets);
      onClose();
    });
  };

  useEffect(() => {
    console.log(widgets);
  }, [widgets]);

  useEffect(() => {
    chrome.storage.sync.get(["widgets"]).then((result) => {
      result.widgets && setWidgets(result.widgets);
    });
  }, []);

  return (
    <div
      className={`fixed grid bg-slate-900/60 backdrop-blur-lg max-w-sm w-full h-[100vh] top-0 left-0 px-8 py-10 text-white transition-all ease-in ${
        !isPanelOpen ? "-left-2/4" : "left-0"
      }`}
    >
      <div className="self-start">
        <Header onClose={onClose}/>
        <Timezones onToggle={toggleTimezones} isActive={widgets.timezones} />
        <TodaysDate onToggle={toggleTodaysDate} isActive={widgets.todaysDate} />
        <Weather onToggle={toggleWeather} isActive={widgets.weather} />
        <Search onToggle={toggleSearch} isActive={widgets.search} />
        <QuickLinks onToggle={toggleQuickLinks} isActive={widgets.quickLinks} />
      </div>
      <div className="grid grid-cols-2 gap-2 self-end">
        <button
          className="px-4 py-3 bg-cyan-500 text-sm font-bold rounded-md"
          onClick={handleSave}
        >
          Save changes
        </button>
        <button className="px-4 py-3 bg-slate-500 text-sm font-bold rounded-md">
          Reset to all
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
