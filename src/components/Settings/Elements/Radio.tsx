import React from "react";

interface RadioProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: any) => void;
}

const Radio: React.FC<RadioProps> = ({
  name,
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className="flex gap-2 items-center mt-1">
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          id={value}
          onChange={onChange}
          checked={checked}
          className="absolute opacity-0 peer cursor-pointer"
        />
        <div className="cursor-pointer w-4 h-4 rounded-full border grid place-content-center border-white peer-checked:border-cyan-500 peer-checked:after:bg-cyan-500 after:block after:h-2 after:w-2 after:rounded-full"></div>
      </div>
      <label htmlFor={`${value}`} className="text-base  cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Radio;
