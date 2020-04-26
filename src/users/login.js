import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/navBar.js";
import { Form, Button, Label } from 'react-bootstrap';
import '../App.css';
import logo from '../images/logo.png';
import { BrowserRouter } from "react-router-dom";
import styled from 'styled-components';

const Title = styled.div`
  padding:14px 5px 14px 0px;
`;

const Text = styled.span`
vertical-align: text-top;
`;

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


export default class Login extends Component {

  constructor(props) {
     super(props);

     this.onChangeStudentID = this.onChangeStudentID.bind(this); //Needed for input fields if they change
     this.onChangePassword = this.onChangePassword.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
         studentID: Number,
         password: String,
     }
  }

  onChangeStudentID(e) {
    this.setState({
        studentID: e.target.value
    });
  }

  onChangePassword(e) {
   this.setState({
       password: e.target.value
   });
  }

  onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('student_id', this.state.studentID);
    localStorage.setItem('password', this.state.password);
    localStorage.setItem('loggedIn', true);
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
            <Text>Quantum Computing Login</Text>
          </Title>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Student ID" onChange={this.onChangeStudentID} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} required/>
          </Form.Group>
          <Button variant="outline-dark" type="submit" style={{width: '100%'}} >
            Submit
          </Button>
          <hr/>
          <a href="/register" role="button"><h6 class="register-text">Not a member? Register here.</h6></a>
        </Form>



        </Body>
      </div>
      </BrowserRouter>
    );
  }
}
