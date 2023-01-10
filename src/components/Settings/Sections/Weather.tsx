import React from "react";
import Section from "../Section";

interface WeatherProps {
  onToggle: () => void;
  isActive: boolean;
}

const Weather: React.FC<WeatherProps> = ({ onToggle, isActive }) => {
  return (
    <Section title="Weather" onToggle={onToggle} isActive={isActive}>
      <label>Location</label>
    </Section>
  );
};

export default Weather;
