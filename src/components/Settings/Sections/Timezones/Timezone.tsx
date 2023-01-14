import React, { useState, useEffect } from "react";
import Select from "react-select";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import cityTimezones from "city-timezones";
import SelectDropdown from "../../Elements/SelectDropdown";

const Timezone = ({ timezone, city, country, name, value, onChange, defaultValue, onBlur,options , onDelete}) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(e.value);
  };

  useEffect(() => {
    const cityMapping = cityTimezones.cityMapping;
    let citiesOptions = [];
    cityMapping.forEach((city) => {
      citiesOptions.push({
        label: `${city.city}, ${city.country}`,
        value: city.timezone,
      });
    });
    setCities(citiesOptions);
    setSelected({
      label: `${city}, ${country}`,
      value: timezone,
    })
  }, []);

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
        {value && value[0].value}
      </span>
      <button className="justify-self-end col-2" onClick={onDelete} type="button">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Timezone;
