import React, { useState, useEffect } from "react";
import Select from "react-select";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import cityTimezones from "city-timezones";
import SelectDropdown from "../../Elements/SelectDropdown";

const Timezone = ({ timezone, city, country }) => {
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
      {cities.length >0 && <SelectDropdown
        name={"cities"}
        options={cities}
        onChange={handleSelect}
        defaultValue={selected}
      />}
      <span className="text-white/50 text-xs col-span-4">
        {selected && selected.timezone}
      </span>
      <button className="justify-self-end col-2">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Timezone;
