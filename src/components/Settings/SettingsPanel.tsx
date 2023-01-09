import React from "react";
import CloseIcon from "../../assets/icons/CloseIcon";

interface Props {
  isPanelOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<Props> = ({onClose, isPanelOpen}) => {
  return (
    <div className={`fixed bg-slate-900/60 backdrop-blur-lg max-w-sm w-full h-[100vh] top-0 left-0 px-8 py-10 text-white transition-all ease-in  ${!isPanelOpen ? '-left-2/4' : 'left-0'}`}>
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button className="px-2" onClick={onClose}>
          <CloseIcon/>
        </button>
      </header>
    </div>
  );
};

export default SettingsPanel;
