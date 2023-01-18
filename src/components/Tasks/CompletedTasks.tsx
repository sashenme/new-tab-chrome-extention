import React, { useState } from "react";
import CaretIcon from "../../assets/icons/CaretIcon";
import TaskItem from "./TaskItem";

interface CompletedTasksProps {
  tasks: any;
  completeTask: any;
  deleteTask: any;
  showCompleted: boolean,
  onClick:()=>void;
  className?: string
}
const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  completeTask,
  deleteTask,
  showCompleted,
  onClick,
  className
}) => {
  return (
    <div className={className}>
      <button className="px-4 rounded-sm w-full flex gap-1 py-2" onClick={onClick}>
        <CaretIcon className={showCompleted ? 'rotate-90' : ''}/>
        <span>
          Completed Tasks (
          {tasks && tasks.filter((task) => task.status === "completed").length})
        </span>
      </button>
      {showCompleted && (
        <div className="grid max-h-[90%] px-6 overflow-y-auto">
          {tasks &&
            tasks.length > 0 &&
            tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <TaskItem
                  id={`task-${task.id}`}
                  title={task.title}
                  checked={task.status === "completed"}
                  onComplete={() => completeTask(task)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
