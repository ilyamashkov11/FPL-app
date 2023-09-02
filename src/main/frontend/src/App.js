
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
import TeamStatsPage from './PageComponents/PlayerStats'
import PlayerStats from './PageComponents/TeamStatsPage'
import TestHeatMap from './components/TestHeatMap';


import './App.css';

function App() {
  
  const client = new QueryClient();

  const heatMapData = [
    {
        "x": 35,
        "y": 38,
        "count": 1
    },
    {
        "x": 35,
        "y": 33,
        "count": 1
    },
    {
        "x": 34,
        "y": 37,
        "count": 1
    },
    {
        "x": 34,
        "y": 15,
        "count": 1
    },
    {
        "x": 34,
        "y": 52,
        "count": 1
    },
    {
        "x": 26,
        "y": 19,
        "count": 1
    },
    {
        "x": 31,
        "y": 5,
        "count": 1
    },
    {
        "x": 31,
        "y": 7,
        "count": 1
    },
    {
        "x": 45,
        "y": 8,
        "count": 1
    },
    {
        "x": 45,
        "y": 52,
        "count": 1
    },
    {
        "x": 45,
        "y": 34,
        "count": 1
    },
    {
        "x": 45,
        "y": 33,
        "count": 1
    },
    {
        "x": 51,
        "y": 40,
        "count": 1
    },
    {
        "x": 51,
        "y": 34,
        "count": 2
    },
    {
        "x": 78,
        "y": 4,
        "count": 1
    },
    {
        "x": 78,
        "y": 29,
        "count": 1
    },
    {
        "x": 78,
        "y": 6,
        "count": 1
    },
    {
        "x": 78,
        "y": 28,
        "count": 1
    },
    {
        "x": 78,
        "y": 16,
        "count": 1
    },
    {
        "x": 78,
        "y": 31,
        "count": 1
    },
    {
        "x": 78,
        "y": 10,
        "count": 1
    },
    {
        "x": 78,
        "y": 11,
        "count": 1
    },
    {
        "x": 63,
        "y": 73,
        "count": 1
    },
    {
        "x": 63,
        "y": 4,
        "count": 1
    },
    {
        "x": 75,
        "y": 30,
        "count": 1
    },
    {
        "x": 75,
        "y": 15,
        "count": 1
    },
    {
        "x": 75,
        "y": 42,
        "count": 1
    },
    {
        "x": 75,
        "y": 52,
        "count": 1
    },
    {
        "x": 75,
        "y": 45,
        "count": 1
    },
    {
        "x": 75,
        "y": 17,
        "count": 1
    },
    {
        "x": 77,
        "y": 35,
        "count": 1
    },
    {
        "x": 77,
        "y": 8,
        "count": 1
    },
    {
        "x": 77,
        "y": 6,
        "count": 2
    },
    {
        "x": 77,
        "y": 4,
        "count": 1
    },
    {
        "x": 77,
        "y": 29,
        "count": 1
    },
    {
        "x": 77,
        "y": 13,
        "count": 1
    },
    {
        "x": 77,
        "y": 18,
        "count": 1
    },
    {
        "x": 43,
        "y": 35,
        "count": 1
    },
    {
        "x": 43,
        "y": 5,
        "count": 1
    },
    {
        "x": 44,
        "y": 5,
        "count": 1
    },
    {
        "x": 44,
        "y": 29,
        "count": 1
    },
    {
        "x": 60,
        "y": 6,
        "count": 1
    },
    {
        "x": 60,
        "y": 18,
        "count": 1
    },
    {
        "x": 58,
        "y": 9,
        "count": 1
    },
    {
        "x": 58,
        "y": 28,
        "count": 1
    },
    {
        "x": 58,
        "y": 30,
        "count": 1
    },
    {
        "x": 79,
        "y": 38,
        "count": 1
    },
    {
        "x": 79,
        "y": 17,
        "count": 1
    },
    {
        "x": 79,
        "y": 5,
        "count": 1
    },
    {
        "x": 79,
        "y": 28,
        "count": 2
    },
    {
        "x": 79,
        "y": 78,
        "count": 1
    },
    {
        "x": 79,
        "y": 67,
        "count": 1
    },
    {
        "x": 79,
        "y": 24,
        "count": 1
    },
    {
        "x": 69,
        "y": 3,
        "count": 1
    },
    {
        "x": 69,
        "y": 32,
        "count": 1
    },
    {
        "x": 69,
        "y": 20,
        "count": 1
    },
    {
        "x": 69,
        "y": 48,
        "count": 1
    },
    {
        "x": 69,
        "y": 16,
        "count": 1
    },
    {
        "x": 69,
        "y": 6,
        "count": 1
    },
    {
        "x": 76,
        "y": 24,
        "count": 1
    },
    {
        "x": 76,
        "y": 14,
        "count": 1
    },
    {
        "x": 76,
        "y": 29,
        "count": 1
    },
    {
        "x": 76,
        "y": 21,
        "count": 1
    },
    {
        "x": 76,
        "y": 61,
        "count": 1
    },
    {
        "x": 76,
        "y": 95,
        "count": 1
    },
    {
        "x": 76,
        "y": 17,
        "count": 1
    },
    {
        "x": 98,
        "y": 37,
        "count": 1
    },
    {
        "x": 98,
        "y": 24,
        "count": 1
    },
    {
        "x": 99,
        "y": 48,
        "count": 1
    },
    {
        "x": 99,
        "y": 24,
        "count": 1
    },
    {
        "x": 72,
        "y": 24,
        "count": 2
    },
    {
        "x": 72,
        "y": 15,
        "count": 1
    },
    {
        "x": 72,
        "y": 73,
        "count": 1
    },
    {
        "x": 81,
        "y": 25,
        "count": 1
    },
    {
        "x": 81,
        "y": 24,
        "count": 1
    },
    {
        "x": 81,
        "y": 68,
        "count": 1
    },
    {
        "x": 74,
        "y": 31,
        "count": 1
    },
    {
        "x": 74,
        "y": 8,
        "count": 1
    },
    {
        "x": 74,
        "y": 6,
        "count": 1
    },
    {
        "x": 74,
        "y": 47,
        "count": 1
    },
    {
        "x": 73,
        "y": 6,
        "count": 1
    },
    {
        "x": 73,
        "y": 15,
        "count": 1
    },
    {
        "x": 73,
        "y": 83,
        "count": 1
    },
    {
        "x": 73,
        "y": 5,
        "count": 1
    },
    {
        "x": 73,
        "y": 14,
        "count": 1
    },
    {
        "x": 73,
        "y": 16,
        "count": 1
    },
    {
        "x": 59,
        "y": 13,
        "count": 1
    },
    {
        "x": 59,
        "y": 21,
        "count": 1
    },
    {
        "x": 59,
        "y": 14,
        "count": 1
    },
    {
        "x": 46,
        "y": 28,
        "count": 1
    },
    {
        "x": 38,
        "y": 25,
        "count": 1
    },
    {
        "x": 66,
        "y": 66,
        "count": 1
    },
    {
        "x": 66,
        "y": 4,
        "count": 1
    },
    {
        "x": 66,
        "y": 9,
        "count": 1
    },
    {
        "x": 70,
        "y": 64,
        "count": 1
    },
    {
        "x": 70,
        "y": 1,
        "count": 1
    },
    {
        "x": 70,
        "y": 41,
        "count": 1
    },
    {
        "x": 70,
        "y": 12,
        "count": 1
    },
    {
        "x": 70,
        "y": 27,
        "count": 1
    },
    {
        "x": 70,
        "y": 45,
        "count": 1
    },
    {
        "x": 70,
        "y": 36,
        "count": 1
    },
    {
        "x": 80,
        "y": 7,
        "count": 1
    },
    {
        "x": 71,
        "y": 25,
        "count": 1
    },
    {
        "x": 71,
        "y": 12,
        "count": 1
    },
    {
        "x": 92,
        "y": 10,
        "count": 1
    },
    {
        "x": 92,
        "y": 25,
        "count": 1
    },
    {
        "x": 92,
        "y": 38,
        "count": 1
    },
    {
        "x": 92,
        "y": 9,
        "count": 1
    },
    {
        "x": 95,
        "y": 73,
        "count": 1
    },
    {
        "x": 95,
        "y": 33,
        "count": 1
    },
    {
        "x": 95,
        "y": 37,
        "count": 1
    },
    {
        "x": 95,
        "y": 19,
        "count": 1
    },
    {
        "x": 95,
        "y": 34,
        "count": 1
    },
    {
        "x": 97,
        "y": 74,
        "count": 1
    },
    {
        "x": 97,
        "y": 21,
        "count": 1
    },
    {
        "x": 97,
        "y": 18,
        "count": 1
    },
    {
        "x": 97,
        "y": 38,
        "count": 1
    },
    {
        "x": 97,
        "y": 31,
        "count": 1
    },
    {
        "x": 97,
        "y": 29,
        "count": 1
    },
    {
        "x": 97,
        "y": 26,
        "count": 1
    },
    {
        "x": 94,
        "y": 24,
        "count": 1
    },
    {
        "x": 94,
        "y": 30,
        "count": 1
    },
    {
        "x": 94,
        "y": 19,
        "count": 1
    },
    {
        "x": 94,
        "y": 15,
        "count": 1
    },
    {
        "x": 94,
        "y": 28,
        "count": 1
    },
    {
        "x": 86,
        "y": 17,
        "count": 2
    },
    {
        "x": 86,
        "y": 72,
        "count": 1
    },
    {
        "x": 68,
        "y": 21,
        "count": 2
    },
    {
        "x": 68,
        "y": 5,
        "count": 2
    },
    {
        "x": 68,
        "y": 6,
        "count": 1
    },
    {
        "x": 65,
        "y": 21,
        "count": 1
    },
    {
        "x": 65,
        "y": 42,
        "count": 1
    },
    {
        "x": 65,
        "y": 1,
        "count": 1
    },
    {
        "x": 65,
        "y": 20,
        "count": 1
    },
    {
        "x": 65,
        "y": 61,
        "count": 1
    },
    {
        "x": 65,
        "y": 4,
        "count": 2
    },
    {
        "x": 65,
        "y": 10,
        "count": 1
    },
    {
        "x": 65,
        "y": 6,
        "count": 2
    },
    {
        "x": 65,
        "y": 41,
        "count": 1
    },
    {
        "x": 57,
        "y": 8,
        "count": 1
    },
    {
        "x": 57,
        "y": 28,
        "count": 1
    },
    {
        "x": 57,
        "y": 14,
        "count": 1
    },
    {
        "x": 57,
        "y": 25,
        "count": 1
    },
    {
        "x": 82,
        "y": 29,
        "count": 1
    },
    {
        "x": 82,
        "y": 88,
        "count": 1
    },
    {
        "x": 82,
        "y": 13,
        "count": 1
    },
    {
        "x": 82,
        "y": 10,
        "count": 1
    },
    {
        "x": 82,
        "y": 6,
        "count": 1
    },
    {
        "x": 90,
        "y": 50,
        "count": 1
    },
    {
        "x": 90,
        "y": 76,
        "count": 1
    },
    {
        "x": 52,
        "y": 7,
        "count": 1
    },
    {
        "x": 52,
        "y": 28,
        "count": 1
    },
    {
        "x": 53,
        "y": 27,
        "count": 1
    },
    {
        "x": 53,
        "y": 14,
        "count": 1
    },
    {
        "x": 53,
        "y": 42,
        "count": 1
    },
    {
        "x": 91,
        "y": 28,
        "count": 1
    },
    {
        "x": 91,
        "y": 27,
        "count": 1
    },
    {
        "x": 91,
        "y": 45,
        "count": 1
    },
    {
        "x": 20,
        "y": 27,
        "count": 1
    },
    {
        "x": 30,
        "y": 10,
        "count": 1
    },
    {
        "x": 30,
        "y": 34,
        "count": 1
    },
    {
        "x": 37,
        "y": 9,
        "count": 1
    },
    {
        "x": 37,
        "y": 34,
        "count": 1
    },
    {
        "x": 37,
        "y": 23,
        "count": 1
    },
    {
        "x": 32,
        "y": 11,
        "count": 1
    },
    {
        "x": 54,
        "y": 13,
        "count": 1
    },
    {
        "x": 62,
        "y": 14,
        "count": 1
    },
    {
        "x": 62,
        "y": 9,
        "count": 1
    },
    {
        "x": 64,
        "y": 23,
        "count": 1
    },
    {
        "x": 64,
        "y": 9,
        "count": 1
    },
    {
        "x": 67,
        "y": 21,
        "count": 3
    },
    {
        "x": 67,
        "y": 13,
        "count": 1
    },
    {
        "x": 67,
        "y": 10,
        "count": 1
    },
    {
        "x": 85,
        "y": 78,
        "count": 1
    },
    {
        "x": 85,
        "y": 21,
        "count": 1
    },
    {
        "x": 85,
        "y": 72,
        "count": 1
    },
    {
        "x": 88,
        "y": 30,
        "count": 1
    },
    {
        "x": 88,
        "y": 26,
        "count": 1
    },
    {
        "x": 41,
        "y": 30,
        "count": 1
    },
    {
        "x": 41,
        "y": 14,
        "count": 1
    },
    {
        "x": 89,
        "y": 29,
        "count": 1
    },
    {
        "x": 89,
        "y": 15,
        "count": 1
    },
    {
        "x": 89,
        "y": 5,
        "count": 1
    },
    {
        "x": 93,
        "y": 34,
        "count": 1
    },
    {
        "x": 93,
        "y": 19,
        "count": 1
    },
    {
        "x": 56,
        "y": 22,
        "count": 1
    },
    {
        "x": 56,
        "y": 35,
        "count": 1
    },
    {
        "x": 56,
        "y": 40,
        "count": 1
    },
    {
        "x": 12,
        "y": 13,
        "count": 1
    },
    {
        "x": 29,
        "y": 13,
        "count": 1
    },
    {
        "x": 25,
        "y": 15,
        "count": 1
    },
    {
        "x": 87,
        "y": 18,
        "count": 1
    },
    {
        "x": 96,
        "y": 25,
        "count": 1
    },
    {
        "x": 96,
        "y": 21,
        "count": 1
    },
    {
        "x": 83,
        "y": 25,
        "count": 1
    },
    {
        "x": 83,
        "y": 26,
        "count": 1
    },
    {
        "x": 83,
        "y": 68,
        "count": 1
    },
    {
        "x": 83,
        "y": 73,
        "count": 1
    },
    {
        "x": 42,
        "y": 21,
        "count": 1
    },
    {
        "x": 28,
        "y": 21,
        "count": 2
    },
    {
        "x": 55,
        "y": 6,
        "count": 1
    },
    {
        "x": 11,
        "y": 7,
        "count": 1
    }
]

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

