import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import callAPI from "./callAPI";
import "./Searchbar.css";

function Searchbar() {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value)
    if (value.trim() !=="") {
        const response = callAPI('/api/search', 'POST', value)
        console.log(response)
    }
  }

  return (
    <div className="container">
      <div className="bar">
        <FaSearch className="searchIcon" />
        <input
          className="searchInput"
          placeholder="Type Your Name..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="results">search bar results</div>
    </div>
  );
}

export default Searchbar;
