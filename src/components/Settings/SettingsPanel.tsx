import React, { useState, useEffect } from "react";
import { initialWeather, initialWidgets } from "../../utils/constants";
import QuickLinks from "./Sections/QuickLinks";
import Search from "./Sections/Search";
import TodaysDate from "./Sections/TodaysDate";
import Weather from "./Sections/Weather";
import Timezones from "./Sections/Timezones";
import Header from "./Sections/Header";
import Footer from "./Sections/Footer";

interface SettingsPanelProps {
  isPanelOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isPanelOpen,
}) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [weather, setWeather] = useState(initialWeather);

  const toggleSection = (section: string) => {
    setWidgets({ ...widgets, [`${section}`]: !widgets[section] });
  };

  const handleUnitChange = (e) => {
    setWeather({...weather, unit: e.target.value});
  };

  const handleSave = () => {
    chrome.storage.sync.set({ widgets: widgets, weather: weather }, () => {
      onClose();
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(["widgets"]).then((result) => {
      result.widgets && setWidgets(result.widgets);
    });
    chrome.storage.sync.get(["weather"]).then((result) => {
      result.weather && setWeather(result.weather);
    });
  }, []);


  useEffect(()=>{
    console.log(weather)
  },[weather])

  return (
    <div
      className={`fixed grid bg-slate-900/60 backdrop-blur-lg max-w-sm w-full h-[100vh] top-0 left-0 px-8 py-10 text-white transition-all ease-in ${
        !isPanelOpen ? "-left-2/4" : "left-0"
      }`}
    >
      <div className="self-start">
        <Header onClose={onClose} />
        <Timezones
          onToggle={() => toggleSection("timezones")}
          isActive={widgets.timezones}
        />
        <TodaysDate
          onToggle={() => toggleSection("todaysDate")}
          isActive={widgets.todaysDate}
        />
        <Weather
          onToggle={() => toggleSection("weather")}
          isActive={widgets.weather}
          selectedUnit={weather.unit}
          onUnitChange={handleUnitChange}
        />
        <Search
          onToggle={() => toggleSection("search")}
          isActive={widgets.search}
        />
        <QuickLinks
          onToggle={() => toggleSection("quickLinks")}
          isActive={widgets.quickLinks}
        />
      </div>
      <Footer handleSave={handleSave} />
    </div>
  );
};

export default SettingsPanel;
