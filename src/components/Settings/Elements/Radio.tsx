import React from "react";

interface RadioProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const Radio: React.FC<RadioProps> = ({ name, label, value, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <input type="radio" name={name} value={value} id={value} onChange={onChange}/>
      <label htmlFor={`${value}`} className="text-base">{label}</label>
    </div>
  );
};

export default Radio;
