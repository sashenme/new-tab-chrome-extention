import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search";

const Search = () => {
  const [text, setText] = useState("");
  const [focus, setIsFocus] = useState(false)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") { 

      function isValidUrl(string) {
        try {
          new URL(string);
          return true;
        } catch (err) {
          return false;
        }
      }

      const query = isValidUrl(text) ? text :`https://www.google.com/search?q=${text}`;
      window.open(query, "_blank");
    }
  };
  return (
    <div>
      <div className={`rounded-full px-6  text-[16px] text-white bg-white/20 backdrop-blur-sm flex items-center border border-white/30 gap-2 mt-20 cursor-text ${focus ? 'border-white/80 bg-slate-400/60' : ''}`}>
        <SearchIcon />
        <input
          type="search"
          className="bg-transparent h-full w-full py-4 outline-none placeholder:text-white/70"
          placeholder="Search Google or type a URL"
          onKeyDown={handleKeyPress}
          onChange={(e) => setText(e.target.value)}
          onFocus={()=>setIsFocus(true)}
          onBlur={()=>setIsFocus(false)}
        />
      </div>
    </div>
  );
};

export default Search;
