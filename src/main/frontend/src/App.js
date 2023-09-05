
import React from 'react';

import Navbar from './components/Navbar';
// import InstructionsSidebar from './components/InstructionsSidebar';
// import Searchbar from './components/Searchbar';
// import UserInfoContainer from './components/UserInfoContainer';
import { useSelector, useDispatch } from "react-redux";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './PageComponents/Home';
import About from './PageComponents/About'
import ErrorPage from './PageComponents/ErrorPage'
import Suggestions from './PageComponents/Suggestions'
import TeamStatsPage from './PageComponents/TeamStatsPage'
import PlayerStats from './PageComponents/PlayerStats'
import TestHeatMap from './components/TestHeatMap';


import './App.css';

function App() {
  
  const client = new QueryClient();

  return (
      <div className="App">
        <Router>
          <QueryClientProvider client={client}>
            <Navbar className="navBar"/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/player-stats' element={<PlayerStats />}/>
              <Route path='/team-stats' element={<TeamStatsPage />}/>
              <Route path='/suggestions' element={<Suggestions />}/>
              <Route path='*' element={<ErrorPage />}/>
            </Routes>
            
            {/* <TestHeatMap data={heatMapData}/> */}
          </QueryClientProvider>
        </Router>
      </div>
  );
}

export default App;

