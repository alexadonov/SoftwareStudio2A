import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/navBar.js";
import { Form, Button, Label } from 'react-bootstrap';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import logo from '../images/logo.png';
import { register, login } from '../users/userInfo';

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

class adminRegister extends Component {

  constructor(props) {
     super(props);

     this.onChangeFirstName = this.onChangeFirstName.bind(this);
     this.onChangeLastName = this.onChangeLastName.bind(this);
     this.onChangeStudentID = this.onChangeStudentID.bind(this);
     this.onChangeEmail = this.onChangeEmail.bind(this);
     this.onChangePassword = this.onChangePassword.bind(this);
     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

     this.state = {
         studentID: '',
         isAdmin: '',
         fname: '',
         lname: '',
         email: '',
         password: '',
         confirmPassword: '',
         confirmAdmin: '',
         mismatched_password: false
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

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      // need to add admin registration 
      student_id: this.state.studentID,
      is_admin: 1,
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      confirm_admin: "unconfirmed"
    }

    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    if (this.state.password === this.state.confirmPassword) {

      this.setState({
        mismatched_password: false
      });

      // create new account
      register(newUser).then(res => {})

      this.setState({
        invalid_details: false
      });
    
      // login after registration
      login(user).then(res => {
        if (localStorage.successful === "True" && localStorage.regoSuccess === "True") {
          /*
          localStorage.setItem('email', this.state.email);
          localStorage.setItem('password', this.state.password);
          localStorage.setItem('isAdmin', this.state.is_admin);
          localStorage.setItem('loggedIn', true);
          */
          localStorage.setItem('regoSuccess', 'False');
          this.props.history.push('/');
        } else {
          this.setState({
            invalid_details: true
          });
        }
      })
    } else {
      this.setState({
        mismatched_password: true,
        invalid_details: true
      });
    }
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Body>
        <Form className="form-background" onSubmit={this.onSubmit}>
        <Title style={{textAlign:"center"}}>
        <img src={logo} class="Uts-logo"/>
        <Text>Register as an Admin</Text>
        </Title>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.onChangeFirstName} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.onChangeLastName} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" name="studentID" placeholder="Staff ID" value={this.state.studentID} onChange={this.onChangeStudentID} required/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" name="email" placeholder="Staff Email" value={this.state.email} onChange={this.onChangeEmail} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} required/>
          </Form.Group>
          <Button variant="outline-dark" type="submit" className="button">
            Register
          </Button>
          <Form.Text style={ this.state.invalid_details ? {textAlign: 'center', color: 'red'} : { visibility: 'hidden'}}>
            {this.state.mismatched_password ? (
              "Password does not match." 
            ) : (
              "Student ID or Email already exists."
            )}
          </Form.Text>
          <hr/>
          <a href="/register" role="button"><h6 class="register-text">Register as Student.</h6></a>
          <a href="/" role="button"><h6 class="register-text">Already a member? Login here.</h6></a>
        </Form>
        </Body>
      </div>
      </BrowserRouter>
    );
  }
} export default withRouter(adminRegister);