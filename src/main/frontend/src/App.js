
import React from 'react';

import Navbar from './components/Navbar';
import InstructionsSidebar from './components/InstructionsSidebar';
import Searchbar from './components/Searchbar';
import UserInfoContainer from './components/UserInfoContainer';
import { useSelector, useDispatch } from "react-redux";


import './App.css';

function App() {
  const {renderState} = useSelector((state) => state.renderState)
  const teamName = useSelector((state) => state.name.teamName)
  
  const dispatch = useDispatch()
  
  return (
      <div className="App">
        <Navbar className="navBar"/>
        <InstructionsSidebar className="InstructionsSidebar"/>
        <Searchbar className="Searchbar"/>
        <div className='teamNameText'>{teamName}</div>
        <UserInfoContainer className="UserInfoContainer" teamName={teamName} renderState={renderState}/>
      </div>
  );
}

export default App;

