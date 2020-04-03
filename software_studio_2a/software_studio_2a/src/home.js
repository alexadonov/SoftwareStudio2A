import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navBar.js";
export default class Home extends Component {
  render() {
    return (
      <div className="App">
      <NavBar/>
        <body className="App-body">
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
        </body>
      </div>
    );
  }
}
