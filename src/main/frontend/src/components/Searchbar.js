import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import callAPI from "./callAPI";
import "./Searchbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTrue } from "./redux/State";
import { setName } from "./redux/TeamNameReducer";

function Searchbar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const {renderState} = useSelector((state) => state.renderState)
  const dispatch = useDispatch()

  const handleChange = (value) => {
    setInput(value)
    setResults([])
    if (hasChars(value)) {
      if (value.trim() !=="") {
        callAPI('/api/search', 'POST', value)
        .then(response => {setResults(response)})
      }
    }
  }

  const handleKeyPress = async (event, value) => {
    if (event.key === "Enter") {
      if (value.trim() !=="") {
        const response = await callAPI('/api/search', 'POST', value)
        console.log(response)
      }
      setInput("")
    }
  }

  const hasChars = (input) => {
    return /[^\d]/.test(input)
  }

  const clearInput = () => {
    setInput('')
  }

  return (
    <div className="container">
      <div className="bar">
        <FaSearch className="searchIcon" />
        <input
          className="searchInput"
          placeholder="Type Your Name/Team Name..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          // onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, input)}
        />
      </div>
      <div className="resultsContainer">
        <div className="mainResultText">Team Name</div>
        <div className="results">
          {results.data && results.data.map((teamname, index) => (
            <div 
              className="res" 
              onClick={(e) => {
                dispatch(setName(teamname.replace(/^"|"$/g, '')))
                dispatch(setTrue())
                clearInput()
                setResults([])
                }}
              key={index}
              >
                {teamname.replace(/^"|"$/g, '')}
            </div>))}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
