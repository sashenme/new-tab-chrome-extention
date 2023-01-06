import React,{useState} from "react";
import SearchIcon from "../../assets/icons/search";

const Search = () => {
  const [text,setText] = useState("");
  const handleKeyPress = event =>{
    if(event.key === 'Enter'){
      window.open(`https://www.google.com/search?q=${text}`, '_blank');
    }
  }
  return (
    <div>
      <div
        className="rounded-full px-6  text-[16px] text-white bg-white/30 backdrop-blur-sm flex items-center border border-white/30 gap-2 mt-20 cursor-text"      
      >
        <SearchIcon />
        <input type="search" className="bg-transparent h-full w-full py-4 outline-none" placeholder="Search Google or type a URL" onKeyPress={handleKeyPress} onChange={e=>setText(e.target.value)}/>
      </div>
    </div>
  );
};

export default Search;
