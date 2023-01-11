import React, { useState } from "react";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";

const Timezones = ({ onToggle, isActive }) => {
  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <div className="grid gap-2 mt-4">
        <Timezone name="Asia/Colombo" city="Colombo, Sri Lanka"/>
        <Timezone name="Australia/Melbourne" city="Melbourne, Australia"/>
      </div>
    </Section>
  );
};

export default Timezones;
