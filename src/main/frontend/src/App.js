
import React from 'react';

import Navbar from './components/Navbar';
import InstructionsSidebar from './components/InstructionsSidebar';
import Searchbar from './components/Searchbar';
import LeagueTables from './components/LeagueTables';

import './App.css';

function App() {
  return (
      <div className="App">
        <Navbar className="navBar"/>
        <InstructionsSidebar className="InstructionsSidebar"/>
        <Searchbar className="Searchbar"/>
        <LeagueTables state='true'/>
      </div>
  );
}

export default App;

