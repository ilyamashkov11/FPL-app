
import React from 'react';

import Navbar from './components/Navbar';
import InstructionsSidebar from './components/InstructionsSidebar';
import Searchbar from './components/Searchbar';
import UserInfoContainer from './components/UserInfoContainer';

import './App.css';

function App() {
  return (
      <div className="App">
        <Navbar className="navBar"/>
        <InstructionsSidebar className="InstructionsSidebar"/>
        <Searchbar className="Searchbar"/>
        <UserInfoContainer className="UserInfoContainer"/>
      </div>
  );
}

export default App;

