import React from "react";
import Section from "../Section";

interface TodayDateProps {
  onToggle: () => void;
  isActive: boolean;
}

const TodayDate: React.FC<TodayDateProps> = ({ onToggle, isActive }) => {
  return (
    <Section title="Today's Date" onToggle={onToggle} isActive={isActive}>
      <></>
    </Section>
  );
};

export default TodayDate;
