import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import callAPI from "./callAPI";
import "./Searchbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTrue } from "./redux/State";
import { setName } from "./redux/TeamNameReducer";
import { setID } from './redux/UserIDReducer'
import { getLeagues, setLeagues } from "./redux/PlayerLeaguesReducer";

function Searchbar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [ids, setIds] = useState([])
  // const [id, setId] = useState()
  const {renderState} = useSelector((state) => state.renderState)
  const dispatch = useDispatch()

  const handleChange = (value) => {
    setInput(value)
    setResults([])
    if (hasChars(value)) {
      if (value.trim() !=="") {
        callAPI('/api/search', 'POST', value)
        .then(response => {
          // console.log(response)
          const ids = response.map((user) => user[0])
          const teamNames = response.map((user) => user[1])
          setResults(teamNames)
          setIds(ids)
        })
      }
    }
  }

  const handleKeyPress = async (event, value) => {
    if (event.key === "Enter") {
      console.log('1 - PRESSED ENTER KEY')
      if (value.trim() !=="") {
        const response = await callAPI('/api/search', 'POST', value)
        console.log("2 - RESPONSE FROM /SEARCH: " + response)
        console.log("3 - TEAM NAME: " + response[0][1])
        await callAPI('/api/player/leagues', 'POST', response)
        .then(response1 => {
          console.log("4 - RESPONSE FROM /LEAGUES: " + response1)
          console.log('5 - SETTING LEAGUES, ID, render = TRUE, TEAM NAME')
          dispatch(setLeagues(response1))
          dispatch(setID(response[0][0]))
          dispatch(setName(response[0][1].replace(/"/g, '')))
          dispatch(setTrue())
          // const teamNames = response1.map((user) => user[1])
          // setResults(teamNames)
          // setIds(ids)
        })
      }
      console.log('6 - CLEARING INPUT FROM SEARCH BAR')
      clearInput()
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
        <div className="mainResultText">Team Name - ID</div>
        <div className="results">
          {results && results.map((teamname, index) => (
            <div 
              className="res" 
              onClick={(e) => {
                console.log('1 - CLICKED A TEAM NAME')
                clearInput()
                setResults([])
                console.log('2 - SETTING TEAM NAME, ID, render = TRUE')
                dispatch(setLeagues([]))
                dispatch(setName(teamname.replace(/^"|"$/g, '')))
                dispatch(setID(ids[index]))
                dispatch(setTrue())
                }}
              key={index}
              >
                {teamname.replace(/^"|"$/g, '')} - {ids[index]}
            </div>))}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
