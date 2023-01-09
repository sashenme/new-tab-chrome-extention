import React,{useState} from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import Section from "./Section";

interface SettingsPanelProps {
  isPanelOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isPanelOpen,
}) => {

  const [toggle, setToggle] = useState(false)
  const handleToggle = () => {
    setToggle(!toggle);
    console.log(!toggle)
  }

  return (
    <div
      className={`fixed bg-slate-900/60 backdrop-blur-lg max-w-sm w-full h-[100vh] top-0 left-0 px-8 py-10 text-white transition-all ease-in  ${
        !isPanelOpen ? "-left-2/4" : "left-0"
      }`}
    >
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button className="px-2" onClick={onClose}>
          <CloseIcon />
        </button>
      </header>
      <Section title={"Time zones"} onToggle={handleToggle}>
      
      </Section>
    </div>
  );
};

export default SettingsPanel;
