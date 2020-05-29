import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { getResults, retrieveCircuits } from '../circuit/apicaller';
import Alert from 'react-bootstrap/Alert';

// Main components
import NavBar from "../components/navBar.js";
import Algorithm from './algorithm_maker';
import Results from '../components/results';


import {getCircuitInput, fixAlgorithm, verifyCircuit, getStudentID, getAlgorithmName, resetTempStorage, setAlgorithmName } from './functions';

const Content = styled.div`
  margin-right: 10%;
`;

const Title = styled.h3`
  margin: 8px;
  padding-top: 1%;
  padding-left: 2%;
`;


//This save the algorithm the user creates as an array
var algorithm = [];
var lineArray = [];
var algor = JSON.parse(localStorage.getItem('algorithm'));

const getItems = (i) => {
  if (algor === null) { return []; }
  var ciruit = algor[i];
  var array = [];
  ciruit.map(function (item) {
    array.push(item);
  });
  return array;
}

export default class AdminDND extends Component {

  //This just sets the state of the list
  constructor(props) {
    super(props);

    var id = uuid();
    this.state = {
      canvas: {
        [id]: []
      },
      results: {},
      is_submitted: false,
      circuit_valid_msg: verifyCircuit(algorithm),
      is_graded: false,
      grade: 0,
    };

    resetTempStorage();

    lineArray[0] = [0, id];
    algorithm[0] = [];
    this.onLoad = this.onLoad.bind(this);
    this.getCircuit = this.getCircuit.bind(this);
  }

  componentDidMount() {
    const token = localStorage.token;
    this.getCircuit();
    this.calculateResults();
  }

  onLoad = () => {
    var id = lineArray[0][1];
    this.setState({ canvas: { [id]: getItems(0) } });
    algorithm[0] = getItems(0);

    if (algor === null) { return; }
    else {
      var length = algor.length;

      for (var j = 1; j < length; j++) {
        var id = uuid();
        let newCanvas = this.state.canvas;
        newCanvas[id] = getItems(j);
        this.setState({ canvas: newCanvas });
        lineArray[lineArray.length] = [lineArray.length, id];
        algorithm[algorithm.length] = getItems(j);
      }
    }
  }

  getCircuit = async () => {
    let student_id = getStudentID();
    setAlgorithmName('hello')
    let circuit_name = getAlgorithmName();
    var list = [];
    const results = await retrieveCircuits({'student_id': student_id, 'is_deleted': 0, 'is_submitted': 0, 'circuit_name': circuit_name});
    for(var i = 0; i < results['circuits'].length; i++) {
      list[i] = results['circuits'][0];
    }

    let list2 = JSON.parse(results['circuits'][0].circuit_input);
    var new_algorithm = [];
    for(var i = 0; i < list2.length; i++) {
      new_algorithm[i] = list2[i];
    }
    localStorage.setItem('algorithm', JSON.stringify(new_algorithm));
    this.calculateResults();
    fixAlgorithm();
    algor = JSON.parse(localStorage.getItem('algorithm'));
    this.onLoad();
  }

  calculateResults = () => {
    let circuit_input = getCircuitInput(algorithm);
    let valid_msg = verifyCircuit(algorithm)
    getResults(circuit_input).then(res => {
      this.setState({ results: res });
    });
    this.setState({ circuit_valid_msg: valid_msg })
    this.forceUpdate();
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const student_id = getStudentID();
    if (student_id) {
      return (
        <div className="App">
          <NavBar />
          <body onLoad={this.onLoad} style={{overflow: 'hidden'}}>
            <DragDropContext>
              <div class="row">
                <div class="col">
                  <Content>
                    <Title>Create Your Algorithm</Title>
                    {Object.keys(this.state.canvas).map((list, i) => (
                        <Algorithm key={i} list={list} state={this.state.canvas} style={{ float: 'left' }} />
                    ))}
                    <Alert style={{ marginLeft: 20 }} variant='warning' show={this.state.circuit_valid_msg !== "valid"} >{this.state.circuit_valid_msg}</Alert>
                    <Alert style={{ marginLeft: 20 }} variant='success' show={this.state.is_submitted && !this.state.is_graded} >
                      <Alert.Heading>Successfully submitted</Alert.Heading>
                    </Alert>
                    <Alert style={{ marginLeft: 20 }} variant='success' show={this.state.is_submitted && this.state.is_graded} >
                      <Alert.Heading>Successfully submitted and graded: {this.state.grade}/100</Alert.Heading>
                    </Alert>
                  </Content>
                  <Content>
                    <Results resultChartData={this.state.results} title={"Measurement Probability Graph"} width={400} height={100} />
                  </Content>
                </div>

              </div>
            </DragDropContext>
          </body>
        </div>
      );
    }
    else {
      window.location.href = '/';
    }
  }
}
