import React from "react";
import Section from "../Section";

interface TasksProps {
  onToggle: () => void;
  isActive: boolean;
}

const Tasks: React.FC<TasksProps> = ({ onToggle, isActive }) => {
  return (
    <Section title="Tasks" onToggle={onToggle} isActive={isActive}>
      <></>
    </Section>
  );
};

export default Tasks;
