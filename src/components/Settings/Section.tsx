import React from "react";
import Toggle from "react-toggle";
import "../../assets/css/react-toggle.css";

interface SectionProps {
  title: string;
  onToggle: (e: any) => void;
  isActive: boolean;
  children: any;
}

const Section: React.FC<SectionProps> = ({ title, onToggle, isActive, children }) => {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Toggle icons={false} checked={isActive} onChange={onToggle} />
      </div>
      <>{children}</>
    </section>
  );
};

export default Section;
