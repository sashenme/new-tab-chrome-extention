import React, { useState, useEffect } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";

interface TaskItemProps {
  id: string;
  title: string;
  checked: boolean;
  onDelete: (e: any) => void;
  onComplete: any;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  checked,
  onComplete,
  onDelete,
  title,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = () => {
    setIsChecked(true);
    setTimeout(() => {
      setIsChecked(isChecked);
    }, 1000);
  };

  return (
    <div className="bg-gray-500/10 backdrop-blur-sm hover:bg-gray-500/60 border-b border-white/20 flex justify-between items-center min-h-[4rem] px-4 last-of-type:border-b-0">
      <div className="flex gap-3 relative">
        <input
          type="checkbox"
          id={id}
          onChange={() => {
            onComplete();
            handleCheck();
          }}
          checked={isChecked}
          className={`cursor-pointer checkbox ${checked ? "already" : "fresh"}`}
        />
        <div className="task-animation"></div>
        <label htmlFor={id} className="text-lg font-normal  cursor-pointer">
          {title}
        </label>
      </div>
      <button className="text-white" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default TaskItem;
