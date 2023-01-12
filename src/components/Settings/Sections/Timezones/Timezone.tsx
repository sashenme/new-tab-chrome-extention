import React, {useState, useEffect} from "react";
import Select from "react-select";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";
import cityTimezones from 'city-timezones'; 
import SelectDropdown from "../../Elements/SelectDropdown";

const Timezone = ({ name, city }) => {
  const [cities, setCities] = useState([]);

  useEffect(()=>{
    const cityMapping = cityTimezones.cityMapping;
    let citiesOptions = [];
    cityMapping.forEach(city=> {
      citiesOptions.push({label: city.city_ascii, value:city.timezone})
    })
  setCities(citiesOptions)
  },[])
  return (
    <div className="grid grid-cols-12 gap-4 items-center justify-between bg-gray-800/80 rounded-lg py-2 pl-2 pr-4">
      <button className="w-6">
        <GrabIcon />
      </button>
      <SelectDropdown name={'cities'}options={cities} 
      />
      {/* <input
        type="text"
        className="col-span-6 text-base text-white bg-transparent w- border border-transparent outline-0 focus:border-white/90 outline-white rounded-md px-2 py-1 hover:border-white/10"
          value={city}
        onChange={(e)=>console.log(e.target.value)}
      /> */}
      <span className="text-white/50 text-xs col-span-4">{name}</span>
      <button className="justify-self-end col-2">
        <DeleteIcon />
      </button>
    </div>
  )
}

export default Timezone;