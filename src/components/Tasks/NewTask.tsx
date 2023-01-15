import React from "react";
import TaskIcon from "../../assets/icons/TaskIcon";

interface NewTaskProps {
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
  value: string;
}

const NewTask: React.FC<NewTaskProps> = ({ onSubmit, onChange, value }) => {
  return (
    <div className="px-6 pb-2">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800/90 hover:bg-gray-700 text-white rounded-md mt-6 relative"
      >
        <div className="absolute top-3 left-4 m-auto">
          <TaskIcon />
        </div>
        <input
          type="text"
          className="bg-transparent px-14 py-3 w-full placeholder:text-gray-300 font-300 outline-none focus:bg-gray-700"
          placeholder="New task"
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
};

export default NewTask;
