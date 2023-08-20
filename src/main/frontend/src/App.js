
import React from 'react';
import Greet from './components/Greet';
import StateTest from './components/StateTest';
import ApiContent from './components/ApiContent';
// import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <div className="App">
      <Greet name="Bruce" lastname="Elena">
      <p> this is Greets children </p>
      <h3> this is an h3 header child </h3>
      </Greet> 

      <Greet>
      <h1> this is greet 2</h1>
        <button></button>
      </Greet>

      <StateTest></StateTest>
      <ApiContent></ApiContent>
    </div>
  );
}

export default App;

