import React from 'react';
import logo from './logo.svg';
import './App.css';

import Events from './components/events';
import Clock from './components/clock'

function App() {
  // const name = 'Bruno'

  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <Events />
      </header>
    </div>
  )
}

export default App;
