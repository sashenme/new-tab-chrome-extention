import React from "react";

interface RadioProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: any) => void;
}

const Radio: React.FC<RadioProps> = ({ name, label, value,checked, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <input type="radio" name={name} value={value} id={value} onChange={onChange} checked={checked}/>
      <label htmlFor={`${value}`} className="text-base">{label}</label>
    </div>
  );
};

export default Radio;
