import React, { useState } from "react";
import CaretIcon from "../../assets/icons/CaretIcon";
import TaskItem from "./TaskItem";

interface CompletedTasksProps {
  tasks: any;
  completeTask: any;
  deleteTask: any;
  showCompleted: boolean,
  onClick:()=>void;
}
const CompletedTasks: React.FC<CompletedTasksProps> = ({
  tasks,
  completeTask,
  deleteTask,
  showCompleted,
  onClick
}) => {
  return (
    <div className="px-6 pt-4 bg-slate-600/20">
      <button className=" px-4 py-3 rounded-sm w-full flex gap-2" onClick={onClick}>
        <CaretIcon className={showCompleted ? 'rotate-90' : ''}/>
        <span>
          Completed Tasks (
          {tasks && tasks.filter((task) => task.status === "completed").length})
        </span>
      </button>
      {showCompleted && (
        <div className="grid">
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
