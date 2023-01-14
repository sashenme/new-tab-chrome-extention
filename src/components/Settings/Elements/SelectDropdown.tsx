import React from "react";
import Select from "react-select";
import Background from "../../Background";

interface SelectDropdownProps {
  name: string;
  options: { label: string; value: string }[] | [];
  onChange: (target: any) => void;
  value?: any;
  defaultValue?: any
}

const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused
      ? "rgba(255,255,255,0.25)"
      : "rgba(255,255,255,0)",
    background: state.isFocused ? "#232627" : "transparent",
    color: "white",
    "&:hover": { cursor: "text" },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    fontFamily: "Inter",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    fontFamily: "Inter",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    width: "280px",
    background: "#232627",
    border: "white",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    fontSize: ".75rem",
    fontFamily: "Inter",
    background: "#232627",
    cursor: "pointer",
    "&:hover": { background: "#3A444A" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    opacity: state.isFocused ? "1" : "0",
  }),
};
const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  onChange,
  value,
  defaultValue,
}) => {
  return (
    <div className="col-span-6 ">
      <Select
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder="Search city.."
        styles={styles}
      />
    </div>
  );
};

export default SelectDropdown;
