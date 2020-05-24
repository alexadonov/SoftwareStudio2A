import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../images/logo.png';
import styled from 'styled-components';
import {vresetTempStorage } from '../circuit/functions.js';
const Title = styled.div`
padding:14px 5px 14px 0px;
`;

const Text = styled.span`
  vertical-align: sub;
  font-size: calc(10px + 2vmin);
`;

export default class NavBar extends Component {

  onLogout = (e) => {
    e.preventDefault();
    resetTempStorage(true);
    window.location.href = '/';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <nav class="navbar navbar-light bg-light">
              <a class="navbar-brand" href="#">
                  <Title>
                    <img src={logo} id="imgUTSLogo" class="imgUTSLogo" alt="UTS" style={{width: '150px'}}/>
                    <Text>Quantum </Text><Text><b>Computing </b></Text>
                  </Title>
              </a>
              <span class="navbar-text">
                <a href="/login" class="nav-link" onClick={this.onLogout}>
                  <img src='data:image/png;base64,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' style={{width: '32px'}}/>
                </a>
              </span>
            </nav>
        </header>

      </div>
    );
  }
}
