import React from "react";
import Section from "../Section";

interface QuickLinksProps {
  onToggle: () => void;
  isActive: boolean;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ onToggle, isActive }) => {
  return (
    <Section title="Quick Links" onToggle={onToggle} isActive={isActive}>
      <></>
    </Section>
  );
};

export default QuickLinks;
