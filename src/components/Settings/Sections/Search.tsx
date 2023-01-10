import React from "react";
import Section from "../Section";

interface SearchProps {
  onToggle: () => void;
  isActive: boolean;
}

const Search: React.FC<SearchProps> = ({ onToggle, isActive }) => {
  return (
    <Section title="Google Search" onToggle={onToggle} isActive={isActive}>
      <></>
    </Section>
  );
};

export default Search;
