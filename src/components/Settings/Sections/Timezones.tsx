import React, { useState } from "react";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import GrabIcon from "../../../assets/icons/GrabIcon";
import Section from "../Section";

const Timezones = ({ onToggle, isActive }) => {
  const Timezone = ({name, city }) => (
    <div className="grid grid-cols-12 gap-4 items-center justify-between bg-gray-800 rounded-lg py-2 pl-2 pr-4">
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

  return (
    <Section title={"Time zones"} onToggle={onToggle} isActive={isActive}>
      <div className="grid gap-3 mt-4">
        <Timezone name="Asia/Colombo" city="Colombo, Sri Lanka"/>
        <Timezone name="Australia/Melbourne" city="Melbourne, Australia"/>
      </div>
    </Section>
  );
};

export default Timezones;
