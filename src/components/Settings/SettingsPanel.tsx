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
  const [favoriteZones, setFavoriteZones] = useState(null)

  const toggleSection = (section: string) => {
    setWidgets({ ...widgets, [`${section}`]: !widgets[section] });
  };

  const handleUnitChange = (e) => {
    setWeather({...weather, unit: e.target.value});
  };

  const handleSave = () => {
    chrome.storage.sync.set({ widgets: widgets, weather: weather, timezones: favoriteZones }, () => {
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
    chrome.storage.sync.get(["timezones"], (result) => {
      result.timezones && setFavoriteZones(result.timezones);
    });
  }, []);

  return (
    <div
      className={`fixed grid bg-slate-900/60 backdrop-blur-lg max-w-lg w-full h-[100vh] top-0 left-0 pl-8 pr-0.5 py-10 text-white transition-all ease-in ${
        !isPanelOpen ? "-left-2/4 opacity-0" : "left-0 opacity-1"
      }`}
    >
      <div className="self-start">
        <Header onClose={onClose} />
        <div className="max-h-[80vh] overflow-y-auto pr-8">
        <Timezones
          onToggle={() => toggleSection("timezones")}
          isActive={widgets.timezones}
          favoriteZones= {favoriteZones}
          getFavorite={(e)=>setFavoriteZones(e.favoriteZone)}
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
      </div>
      <Footer handleSave={handleSave} />
    </div>
  );
};

export default SettingsPanel;
