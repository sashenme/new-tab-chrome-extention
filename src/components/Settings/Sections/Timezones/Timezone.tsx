import React from "react";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../../assets/icons/GrabIcon";

const Timezone = ({ name, city }) => (
  <div className="grid grid-cols-12 gap-4 items-center justify-between bg-gray-800/80 rounded-lg py-2 pl-2 pr-4">
    <button className="w-6">
      <GrabIcon />
    </button>
    <input
      type="text"
      className="col-span-6 text-base text-white bg-transparent w- border border-transparent outline-0 focus:border-white/90 outline-white rounded-md px-2 py-1 hover:border-white/10"
      value={city}
    />
    <span className="text-white/50 text-xs col-span-4">{name}</span>
    <button className="justify-self-end col-2">
      <DeleteIcon />
    </button>
  </div>
);

export default Timezone;
