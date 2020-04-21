import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../images/logo.png';

export default class NavBar extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <nav class="navbar navbar-light bg-light">
              <a class="navbar-brand" href="#">
                  <img src={logo} width="150" height="60" class="d-inline-block align-top" alt=""></img>
              </a>
              <span class="navbar-text">
                <a href="/login" class="nav-link">Login</a>
              </span>
            </nav>
        </header>

      </div>
    );
  }
}
