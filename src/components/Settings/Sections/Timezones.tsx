import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";

const Timezones = ({ onToggle, isActive }) => {
  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <div className="grid gap-2 mt-4">
        <Timezone name="Asia/Colombo" city="Colombo, Sri Lanka"/>
        <Timezone name="Australia/Melbourne" city="Melbourne, Australia"/>
        <button className="bg-black hover:bg-gray-900 rounded-full px-4 py-2 flex items-center gap-1 w-full max-w-[8rem] mx-auto mt-4"><PlusIcon/><span>Add timezone</span></button>
      </div>
    </Section>
  );
};

export default Timezones;