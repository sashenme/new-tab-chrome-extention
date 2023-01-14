import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";
import cityTimezones from "city-timezones";

const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-black hover:bg-gray-900 rounded-full px-4 py-2 flex items-center gap-1 w-full max-w-[8rem] mx-auto mt-4"
  >
    <PlusIcon />
    <span>Add timezone</span>
  </button>
);

const initialTimezones = [
  {
    id: "1",
    timezone: "Asia/Colombo",
    city: "Colombo",
    country: "Sri Lanka",
  },
];

const Timezones = ({ onToggle, isActive }) => {
  const [list, setList] = useState(initialTimezones);

  const addNewTimezone = () => {
    const newTime = {
      id: "1x",
      timezone: "Asia/Matara",
      city: "Matara",
      country: "Sri Lanka",
    };
    setList([...list, newTime]);
  };

  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <div className="grid gap-2 mt-4">
        {list.map((timezone, i) => (
          <Timezone
            key={i}
            timezone={timezone.timezone}
            city={timezone.city}
            country={timezone.country}
          />
        ))}
      </div>

      <Button onClick={addNewTimezone} />
    </Section>
  );
};

export default Timezones;
