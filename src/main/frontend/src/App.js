
import React from 'react';

import Navbar from './components/Navbar';
import InstructionsSidebar from './components/InstructionsSidebar';
import Searchbar from './components/Searchbar';
import UserInfoContainer from './components/UserInfoContainer';
import { useSelector, useDispatch } from "react-redux";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


import './App.css';

function App() {
  const {renderState} = useSelector((state) => state.renderState)
  const teamName = useSelector((state) => state.name.teamName)
  const client = new QueryClient();
  return (
      <div className="App">
      <QueryClientProvider client={client}>
          <Navbar className="navBar"/>
          <InstructionsSidebar className="InstructionsSidebar"/>
          <Searchbar className="Searchbar"/>
          <div className='teamNameText'>{teamName}</div>
          <UserInfoContainer className="UserInfoContainer" teamName={teamName} renderState={renderState}/>
      </QueryClientProvider>
      </div>
  );
}

export default App;

