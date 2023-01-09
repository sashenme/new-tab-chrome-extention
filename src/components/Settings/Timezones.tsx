import React, { useState } from "react";
import Section from "./Section";

const Timezones = ({onToggle, isActive}) => { 
  return (
    <Section title={"Time zones"} onToggle={onToggle} isActive={isActive}><></></Section>
  );
};

export default Timezones;
