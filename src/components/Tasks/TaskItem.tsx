import React from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";

interface TaskItemProps {
  id: string,
  title: string,
  checked: boolean,
  onDelete: (e: any) => void,
  onComplete: (e: any) => void | any,
}


const TaskItem: React.FC<TaskItemProps> = ({
  id, checked, onComplete, onDelete, title
}) => {
  return (
    <div className="bg-gray-500/10 hover:bg-gray-500/60 border-b border-white/20 flex justify-between items-center min-h-[4rem] px-4 last-of-type:border-b-0">
      <div className="flex gap-2">
        <input
          type="checkbox"
          id={id}
          onChange={onComplete}
          checked={checked}
        />
        <label htmlFor={id} className="text-lg font-normal">{title}</label>
      </div>
      <button className="text-white" onClick={onDelete}>
        <DeleteIcon/>
      </button>
    </div>
  );
};

export default TaskItem;
