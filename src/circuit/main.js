import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import download from 'downloadjs';
import { saveCircuit, getResults, healthCheck } from '../circuit/apicaller';
import { Dropdown } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

// Main components
import NavBar from "../components/navBar.js";
import Toolbox from './toolbox.js';
import Algorithm from './algorithm_maker';
import Results from '../components/results';

// Data files
import DISPLAYS from './data/displays.js'
import PROBES from './data/probes.js';
import HALF_TURNS from './data/half_turns.js';
import QUARTER_TURNS from './data/quarter_turns.js';
import EIGHTH_TURNS from './data/eighth_turns.js';
import PARAMETRIZED from './data/parametrized.js';
import SAMPLING from './data/sampling.js';
import PARITY from './data/parity.js';
import EMPTY from './data/empty.js';

import { remove, reorder, copy, move, findCopyItemsId, getCircuitInput, verifyCircuit, findCopyItems } from './functions';

// All CSS for this file
// Each div as been created with a name (see below)
// You can then use that in the HTML instead of the word div
// This just makes the code nicer and easier to read
const Content = styled.div``;

const Title = styled.h3`
  margin: 8px;
  padding-top: 1%;
  padding-left: 2%;
`;

const SubTitle = styled.h5`
  margin: 8px;
  padding-top: 1%;
`;

const Button = styled.button`
  float: left;
  vertical-align: middle;
  min-height: 10vh;
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  border: 0px  rgba(0,0,0,0);
  font-size: 1em;
  margin: 0.25em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none !important;
  `;

//This save the algorithm the user creates as an array
var algorithm = [];
var lineArray = [];
var history = [];
var algor //= JSON.parse(localStorage.getItem('algorithm'));

const getItems = (i) => {
  if (algor === null) { return []; }
  var ciruit = algor[i];
  var array = [];
  ciruit.map(function (item) {
    array.push(item);
  });
  return array;
}

export default class Main extends Component {

  //This just sets the state of the list
  constructor(props) {
    super(props);

    var id = uuid();
    this.state = {
      canvas: {
        [id]: []
      },
      results: {},
      circuit_valid_msg: verifyCircuit(algorithm)
    };

    this.undoButton = React.createRef(); // quick solution, better to use states
    this.redoButton = React.createRef();

    sessionStorage.setItem("currentversion", 0);
    sessionStorage.setItem("finalversion", 0);
    localStorage.setItem("algorithm_input_saved", false);

    lineArray[0] = new Array(0, id);
    algorithm[0] = new Array(0, new Array());
    history[0] = { ... this.state.canvas };

    lineArray[0] = [0, id];
    algorithm[0] = [];
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onNewLine = this.onNewLine.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onExport = this.onExport.bind(this);
    // this.results = "Add a gate to the circuit to get started"
  }

  componentDidMount() {
    var vers = parseInt(sessionStorage.getItem("currentversion"));
    var finalvers = parseInt(sessionStorage.getItem("finalversion"));

    this.undoButton.current.disabled = (vers === 0);
    this.redoButton.current.disabled = (vers === finalvers);
  }

  // This is what combines everything to make move items work
  // This reads the source list and destination list to figure out
  // What is meant to happen
  onDragEnd = result => {
    const { source, destination } = result;
    let newCanvas;

    if ((source.droppableId === "DISPLAYS" ||
      source.droppableId === "PROBES" ||
      source.droppableId === "HALF_TURNS" ||
      source.droppableId === "QUARTER_TURNS" ||
      source.droppableId === "EIGHTH_TURNS" ||
      source.droppableId === "PARAMETRIZED" ||
      source.droppableId === "SAMPLING" ||
      source.droppableId === "PARITY" ||
      source.droppableId === "EMPTY") &&
      (!destination || source.droppableId === destination.droppableId)) {
      return;
    }

    // dropped outside the list
    if (!destination) {
      newCanvas = remove( 
        this.state.canvas[source.droppableId], 
        source, 
        algorithm, 
        lineArray
        )
      this.setState({ canvas: newCanvas}, () => {
        this.addToHistory()
      });
      console.log("Algor: " + localStorage.getItem("algorithm"));
      this.calculateResults()
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        newCanvas = {[destination.droppableId]: reorder( 
          this.state.canvas[source.droppableId], 
          source.index, 
          destination.index, 
          destination, 
          algorithm, 
          lineArray)}
          
        this.setState({ canvas: newCanvas}, () => {
          this.addToHistory()
        });

        break;
      case findCopyItemsId(source.droppableId):
        newCanvas = {[destination.droppableId]: copy(
          findCopyItems(source.droppableId),
          this.state.canvas[destination.droppableId],
          source,
          destination,
          algorithm,
          lineArray
          )}
        this.setState({ canvas: newCanvas }, () => {
          this.addToHistory()
        });
        break;
      default:
        newCanvas = move(
          this.state.canvas[source.droppableId],
          this.state.canvas[destination.droppableId],
          source,
          destination,
          algorithm,
          lineArray
        )
        this.setState({ canvas: newCanvas }, () => {
          this.addToHistory()
        });
        break;
    }

    this.calculateResults()
    console.log("Algor: " + localStorage.getItem("algorithm"));
    console.log(this.state.canvas);
  };

  onNewLine = () => {
    //Create a new List
    var id = uuid();
    this.setState({canvas: { [id]: [] }});
    lineArray[lineArray.length] = [lineArray.length, id];
    algorithm[algorithm.length] = [];
  }

  onCreate = () => {
    //Checks the algorithm has been saved
    // if not, prompts user to save
    // Otherwise, clears session and begins a new one
    if (window.confirm("Do you want to create a new algorithm?")) {
      localStorage.setItem('algorithm', null);
      window.location.href = '/dnd';
    } else {
      return;
    }
  }

  onLoad = () => {
    //Searches database for all algorithms the user has saved
    // Shows a drop down list of these so the user can choose
    var id = lineArray[0][1];

    this.setState({canvas: { [id]: getItems(0) }});
    algorithm[0] = getItems(0);
    console.log(this.state.canvas[id]);

    if (algor === null) { return; }
    else {
      var length = algor.length;

      for (var j = 1; j < length; j++) {
        var id = uuid();
        this.setState({canvas: { [id]: getItems(j) }});
        lineArray[lineArray.length] = new Array(lineArray.length, id);
        algorithm[algorithm.length] = getItems(j);
      }
    }
    console.log(this.state.canvas);
  }

  // Refreshes the page so user can restart algorithm
  onDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this algorithm?")) {
      // Delete from database
      // Delete from local storage
      localStorage.setItem('algorithm', null);
      localStorage.setItem("algorithm_input_saved", false);
      window.location.href = '/dnd';
    } else {
      return;
    }
  }

  // Submits the algorithm
  onSubmit = () => {
    //Only show this button if algorithm has been saved

    //submit to database
    verifyCircuit(algorithm);
    //Make algorithm read only
  }

  calculateResults = () => {
    let circuit_input = getCircuitInput(algorithm);
    let valid_msg = verifyCircuit(algorithm)
    if (circuit_input !== null && !circuit_input.EMPTY) {
      if (valid_msg === "valid") {
        getResults(circuit_input).then( res => {
          this.setState({results: res})
          console.log("results:", this.state.results)
        });
      }
      this.setState({circuit_valid_msg: valid_msg})
      this.forceUpdate();
    } else {
      this.setState({results: {}})
    }
  }

  onSave = () => {
    var studentid = 98106545; //getStudentID();

    var circuit_input = getCircuitInput(algorithm);
    if (verifyCircuit(algorithm) !== "valid") { return; }
    var algorithm_name = window.prompt("Please name your algorithm:");
    while (algorithm_name !== null && algorithm_name.length === 0) {
      alert("Please enter a valid name.");
      algorithm_name = window.prompt("Please name your algorithm:");
    }
    if (algorithm_name !== null && algorithm_name.length !== 0) {
      localStorage.setItem(algorithm_name, circuit_input);
      localStorage.setItem("algorithm_input_saved", true);
      var alg = localStorage.getItem("algorithm");
      saveCircuit(studentid, algorithm_name, alg, "no results");
      alert("Your algorithm as been succesfully saved!");
    }

  }

  addToHistory = () => {
    var vers = parseInt(sessionStorage.getItem("currentversion")) + 1;
    history[vers] = { ... this.state.canvas };
    history.slice(0, vers);
    sessionStorage.setItem("currentversion", vers);
    sessionStorage.setItem("finalversion", vers);

    this.undoButton.current.disabled = (vers === 0);
    this.redoButton.current.disabled = true;
  }

  onUndo = () => {
    var vers = parseInt(sessionStorage.getItem("currentversion"));
    var finalvers = parseInt(sessionStorage.getItem("finalversion"));
    if (vers > 0) {
      vers = vers - 1;
      this.setState({canvas: 
        history[vers]
      });
      sessionStorage.setItem("currentversion", vers);
      this.undoButton.current.disabled = (vers === 0);
      this.redoButton.current.disabled = (vers === finalvers);
    }
  }

  onRedo = () => {
    var vers = parseInt(sessionStorage.getItem("currentversion"));
    var finalvers = parseInt(sessionStorage.getItem("finalversion"));
    if (vers < finalvers) {
      vers = vers + 1;
      this.setState({canvas: 
        history[vers]
      });
      sessionStorage.setItem("currentversion", vers);
      this.undoButton.current.disabled = (vers === 0);
      this.redoButton.current.disabled = (vers === finalvers);
    }
  }

  onExport = () => {
    //Check it has been saved first

    //submit to database
    if (localStorage.getItem("algorithm") !== "null") {
      if (localStorage.getItem("algorithm_input_saved") !== "false") {
        download(localStorage.getItem('algorithm'), "algorithm.json", "text/json");
        return;
      }

      alert("You must first save your algorithm.");
      return;
    }

    alert("You have not created an algorithm yet.");
  }

  deleteLine = (list, i) => {
    if (algorithm.length === 1) {
      alert("You cannot delete this line");
      return;
    }
    let newState = this.state.canvas;
    delete newState[list];
    this.setState({canvas: newState});
    algorithm.splice(i, 1);
    lineArray.splice(i, 1);
    console.log(algorithm);
    for (var j = i; j < lineArray.length; j++) {
      lineArray[j][0]--;
    }
    console.log(lineArray)
    localStorage.setItem("algorithm", JSON.stringify(algorithm));
    this.addToHistory()
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div className="App">
        <NavBar />
        <body onLoad={this.onLoad}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div class="row">
              <div class="col-8">

                <div class="row" style={{ margin: '8px', padding: '1%' }}>
                  <div className="col">
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Load
                               </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={this.onLoad}>Algorithm 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={this.onLoad}>Algorithm 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={this.onLoad}>Algorithm 3</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col">
                    <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onSave}>Save</button>
                  </div>
                  <div className="col">
                    <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                  </div>
                  <div className="col">
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Delete
                               </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={this.onDelete}>Algorithm 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={this.onDelete}>Algorithm 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={this.onDelete}>Algorithm 3</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col">
                    <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onExport}>Export</button>
                  </div>
                </div>

                <div class="row" style={{ margin: '8px', padding: '1%' }}>
                  <div className="col">
                    <button style={{ float: 'left' }} class="btn btn-primary" onClick={this.onCreate}>Create New</button>
                  </div>
                  <div className="col">
                    <button style={{ float: 'left' }} class="btn btn-primary" onClick={this.onNewLine}>Add Wire</button>
                  </div>
                  <div className="col"></div>
                  <div className="col">
                    <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onUndo} ref={this.undoButton}>Undo</button>
                  </div>
                  <div className="col">
                    <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onRedo} ref={this.redoButton} >Redo</button>
                  </div>
                </div>
                <Content>
                  <Title>Create Your Algorithm</Title>
                  {Object.keys(this.state.canvas).map((list, i) => (
                    <div>
                      <Button onClick={() => this.deleteLine(list, i)}>X</Button>
                      <Algorithm key={i} list={list} state={this.state.canvas} style={{ float: 'left' }} />
                    </div>
                  ))}
                  <Alert style={{ marginLeft: 20 }} variant='warning' show={this.state.circuit_valid_msg!=="valid"} >{this.state.circuit_valid_msg}</Alert>
                </Content>
                <Content>
                  <Results resultChartData={this.state.results} title={"Measurement Probability Graph"} width={400} height={100} />
                </Content>
              </div>
              <div class="col-4">
                <Title>Toolbox</Title>
                <div className="row" style={{ paddingLeft: '5%' }}>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Displays</SubTitle>
                    <Toolbox droppableId="DISPLAYS" list={DISPLAYS} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Probes</SubTitle>
                    <Toolbox droppableId="PROBES" list={PROBES} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Half Turns</SubTitle>
                    <Toolbox droppableId="HALF_TURNS" list={HALF_TURNS} />
                  </div>
                </div>
                <div className="row" style={{ paddingLeft: '5%' }}>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Quarter Turns</SubTitle>
                    <Toolbox droppableId="QUARTER_TURNS" list={QUARTER_TURNS} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Eighth Turns</SubTitle>
                    <Toolbox droppableId="EIGHTH_TURNS" list={EIGHTH_TURNS} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Parametrized</SubTitle>
                    <Toolbox droppableId="PARAMETRIZED" list={PARAMETRIZED} />
                  </div>
                </div>
                <div className="row" style={{ paddingLeft: '5%' }}>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Sampling</SubTitle>
                    <Toolbox droppableId="SAMPLING" list={SAMPLING} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Parity</SubTitle>
                    <Toolbox droppableId="PARITY" list={PARITY} />
                  </div>
                  <div class="col" style={{ padding: 0 }}>
                    <SubTitle>Empty </SubTitle>
                    <Toolbox droppableId="EMPTY" list={EMPTY} />
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        </body>
      </div>
    );
  }
}
