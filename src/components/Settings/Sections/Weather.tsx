import React from "react";
import { units } from "../../../utils/constants";
import Radio from "../Elements/Radio";
import Section from "../Section";

interface WeatherProps {
  onToggle: () => void;
  isActive: boolean;
  onUnitChange: any; 
  selectedUnit: string
}

const Weather: React.FC<WeatherProps> = ({ onToggle, isActive, onUnitChange,selectedUnit }) => {
  return (
    <Section title="Weather" onToggle={onToggle} isActive={isActive}>
      <div>
        <label className="text-sm text-neutral-400 mb-2">Unit</label>
        <div className="flex gap-6 items-center">
          {units.map((unit) => (
              <Radio
              checked={selectedUnit === unit.name}
              key={unit.name}
              name="unit"
              value={unit.name}
              label={unit.temperature}
              onChange={onUnitChange}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Weather;
