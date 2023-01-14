import React from "react";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import SelectDropdown from "../../Elements/SelectDropdown";

const Timezone = ({name, value, onChange, defaultValue, onBlur,options , onDelete}) => {  

  return (
    <div className="grid grid-cols-12 gap-4 items-center justify-between bg-gray-800/80 rounded-lg py-2 pl-2 pr-4">
      <button className="w-6">
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
      <button className="justify-self-end col-2" onClick={onDelete} type="button">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Timezone;
