import React from 'react';
import logo from './images/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"   />
        <p>
          Welcome to software studio 2
        </p>
        <a
          className="App-link"
          href="https://github.com/alexadonov/SoftwareStudio2A"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find the repository here
        </a>
      </header>
    </div>
  );
}

export default App;
