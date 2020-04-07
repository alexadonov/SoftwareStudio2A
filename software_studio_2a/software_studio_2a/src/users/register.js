import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/navBar.js";
import { Form, Button, Label } from 'react-bootstrap';

export default class Register extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <body className="App-register">
        <Form className="form-background">
          <h1 class="h1">Register</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Student ID"/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Student Email"/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="button">
            Submit
          </Button>
          <hr/>
          <a href="/login" role="button"><h6 class="register-text">Already a member? Login here.</h6></a>
        </Form>
        </body>
      </div>
    );
  }
}
