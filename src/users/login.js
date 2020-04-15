import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/navBar.js";
import { Form, Button, Label } from 'react-bootstrap';
import '../App.css';
import logo from '../images/logo.png';

export default class Login extends Component {
  render() {
    return (
      <div className="App">
        <body className="App-login">
        <Form className="form-background">
          <h1 class="h1">Login</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Student ID"/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-light" type="submit" className="button">
            Submit
          </Button>
          <hr/>
          <a href="/register" role="button"><h6 class="register-text">Not a member? Register here.</h6></a>
        </Form>



        </body>
      </div>
    );
  }
}
