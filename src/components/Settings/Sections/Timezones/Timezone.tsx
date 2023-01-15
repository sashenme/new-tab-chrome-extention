import React from "react";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import SelectDropdown from "../../Elements/SelectDropdown";

const Timezone = ({
  name,
  value,
  onChange,
  defaultValue,
  onBlur,
  options,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isOnDrag,
  dragHandle
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault}
      className={`${isOnDrag ? 'bg-gray-800 border border-white/10' : 'bg-gray-800/80'} grid grid-cols-12 gap-4 items-center justify-between rounded-lg py-2 pl-2 pr-4`}
    >
      <button className="w-6" type="button" {...dragHandle}>
        <GrabIcon />
      </button>
      <SelectDropdown
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        onBlur={onBlur}
      />
      <span className="text-white/50 text-xs col-span-4">
        {value && value[0]?.value}
      </span>
      <button
        className="justify-self-end col-2"
        onClick={onDelete}
        type="button"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Timezone;
