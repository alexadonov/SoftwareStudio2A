import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/navBar.js";
import { Form, Button, Label } from 'react-bootstrap';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import logo from '../images/logo.png';

const Body = styled.body`
  background-color: white;
  background-blend-mode: multiply;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`;

  const Title = styled.div`
    padding:14px 5px 14px 0px;
  `;

  const Text = styled.span`
  vertical-align: text-top;
  `;

export default class Register extends Component {

  constructor(props) {
     super(props);

     this.onChangeFirstName = this.onChangeFirstName.bind(this);
     this.onChangeLastName = this.onChangeLastName.bind(this);
     this.onChangeStudentID = this.onChangeStudentID.bind(this);
     this.onChangeEmail = this.onChangeEmail.bind(this);
     this.onChangePassword = this.onChangePassword.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
         fname: String,
         lname: String,
         studentID: Number,
         email: String,
         password: String,
     }
  }

  onChangeFirstName(e) {
    this.setState({
        fname: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
        lname: e.target.value
    });
  }

  onChangeStudentID(e) {
    this.setState({
        studentID: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
        email: e.target.value
    });
  }

  onChangePassword(e) {
   this.setState({
       password: e.target.value
   });
  }

  onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('fname', this.state.fname);
    localStorage.setItem('lname', this.state.lname);
    localStorage.setItem('student_id', this.state.studentID);
    localStorage.setItem('email', this.state.email);
    localStorage.setItem('password', this.state.password);
    window.location.href = '/dnd';
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Body>
        <Form className="form-background" onSubmit={this.onSubmit}>
        <Title>
        <img src={logo} class="Uts-logo"/>
        <Text>Quantum Computing Register</Text>
        </Title>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="First Name" onChange={this.onChangeFirstName} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Last Name" onChange={this.onChangeLastName} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Student ID" onChange={this.onChangeStudentID} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Student Email" onChange={this.onChangeEmail} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} required/>
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="button">
            Submit
          </Button>
          <hr/>
          <a href="/" role="button"><h6 class="register-text">Already a member? Login here.</h6></a>
        </Form>
        </Body>
      </div>
      </BrowserRouter>
    );
  }
}
