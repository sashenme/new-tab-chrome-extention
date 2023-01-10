import React from "react";
import Radio from "../Elements/Radio";
import Section from "../Section";

interface WeatherProps {
  onToggle: () => void;
  isActive: boolean;
  onUnitChange: (e: string) => void;
}

const Weather: React.FC<WeatherProps> = ({ onToggle, isActive, onUnitChange }) => {
  return (
    <Section title="Weather" onToggle={onToggle} isActive={isActive}>
      <div>
        <label className="text-sm text-neutral-400 mb-2">Unit</label>
        <div className="flex gap-6 items-center">
          <Radio
            name="unit"
            value="metric"
            label="Celsius"
            onChange={onUnitChange}
          />
          <Radio
            name="unit"
            value="imperial "
            label="Fahrenheit"
            onChange={onUnitChange}
          />
        </div>
      </div>
    </Section>
  );
};

export default Weather;
