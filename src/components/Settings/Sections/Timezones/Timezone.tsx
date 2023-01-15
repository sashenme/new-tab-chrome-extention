import React from "react";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import SelectDropdown from "../../Elements/SelectDropdown";

type TSelectOption = {
  value: string;
  label: string;
};

interface TimezoneProps {
  name: string;
  value: TSelectOption[];
  onChange: (e: any) => void;
  defaultValue: TSelectOption[];
  onBlur: (e: any) => void;
  options: TSelectOption[];
  onDelete: () => void;
  isOnDrag: boolean;
  dragHandle: any;
}

const Timezone: React.FC<TimezoneProps> = ({
  name,
  value,
  onChange,
  defaultValue,
  onBlur,
  options,
  onDelete,
  isOnDrag,
  dragHandle,
}) => {
  return (
    <div
      className={`${
        isOnDrag ? "bg-gray-800 border border-white/10" : "bg-gray-800/80"
      } grid grid-cols-12 gap-4 items-center justify-between rounded-lg py-2 pl-2 pr-4`}
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
        className="justify-self-end col-2 text-red-600"
        onClick={onDelete}
        type="button"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Timezone;
