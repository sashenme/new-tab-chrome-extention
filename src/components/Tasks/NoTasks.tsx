import React from "react";

interface NoTasksProps {
  title: string;
  description?: string;
}

const NoTasks: React.FC<NoTasksProps> = ({ title, description }) => {
  return (
    <div className="grid place-content-center text-center bg-slate-400/40 rounded-sm h-full">
      <h2 className="text-2xl">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export default NoTasks;
