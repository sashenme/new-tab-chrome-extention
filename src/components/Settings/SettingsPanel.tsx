import React, { useState, useEffect } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import Timezones from "./Timezones";

interface SettingsPanelProps {
  isPanelOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isPanelOpen,
}) => {
  const [widgets, setWidgets] = useState({ timezones: true });

  const toggleTimezones = () => {
    setWidgets({ timezones: !widgets.timezones });
  };

  const handleSave = () => {
      chrome.storage.sync.set({ widgets: widgets }, () => { 
        onClose();
      });
  };

  useEffect(() => {
    console.log(widgets);
  }, [widgets]);

  const storageCache = { count: 0 };
  useEffect(() => {
    chrome.storage.sync.get(["widgets"]).then((result) => {
      result.widgets && setWidgets(result.widgets)
    });
  }, []);

  return (
    <div
      className={`fixed grid bg-slate-900/60 backdrop-blur-lg max-w-sm w-full h-[100vh] top-0 left-0 px-8 py-10 text-white transition-all ease-in ${
        !isPanelOpen ? "-left-2/4" : "left-0"
      }`}
    >
      <div className="self-start">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button className="px-2" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
        <Timezones onToggle={toggleTimezones} isActive={widgets.timezones}/>
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
