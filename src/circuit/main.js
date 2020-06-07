import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import download from 'downloadjs';
import { saveCircuit, getResults, healthCheck, deleteCircuit, retrieveCircuits, submitCircuit } from '../circuit/apicaller';
import { Dropdown } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import jwt_decode from 'jwt-decode';

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

import { remove, reorder, copy, move, findCopyItemsId, getCircuitInput, verifyCircuit, findCopyItems, escapeSpecialCharacters, getUserID, getAlgorithmName, isValidAlgorithmName, resetTempStorage, setAlgorithmName } from './functions';

// All CSS for this file
// Each div as been created with a name (see below)
// You can then use that in the HTML instead of the word div
// This just makes the code nicer and easier to read
const Content = styled.div``;

const Title = styled.h3`
  margin: 8px;
  padding-top: 10px;
  padding-left: 2%;
`;

const SubTitle = styled.h5`
  margin: 8px;
  padding-top: 10px;
`;

const Button = styled.button`
  float: left;
  vertical-align: middle;
  min-height: 100px;
  max-height: 100px;
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
      is_submitted: false,
      is_saved: false,
      circuit_valid_msg: verifyCircuit(algorithm),
      is_new: true,
      is_graded: false,
      algorithm_name: "",
      grade: 0,
      loaded_algs: [],
      filter: "",
      filtered_algs: []
    };

    this.undoButton = React.createRef(); // quick solution, better to use states
    this.redoButton = React.createRef();

    resetTempStorage();

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
    this.filterAlgorithms = this.filterAlgorithms.bind(this);
  }

  componentDidMount() {
    var vers = parseInt(sessionStorage.getItem("currentversion"));
    var finalvers = parseInt(sessionStorage.getItem("finalversion"));
    this.undoButton.current.disabled = (vers === 0);
    this.redoButton.current.disabled = (vers === finalvers);
    this.calculateResults();
    const token = localStorage.token;
    this.getList();
  }

  // This is what combines everything to make move items work
  // This reads the source list and destination list to figure out
  // What is meant to happen
  onDragEnd = result => {
    if (!this.state.is_submitted) {
      const { source, destination } = result;
      let newCanvas = this.state.canvas;

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
        let merged = { ...this.state.canvas, ...newCanvas };
        this.setState({ canvas: merged }, () => {
          this.addToHistory()
        });
        //console.log("Algor: " + localStorage.getItem("algorithm"));
        this.calculateResults()
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          newCanvas[destination.droppableId] = reorder(
            this.state.canvas[source.droppableId],
            source.index,
            destination.index,
            destination,
            algorithm,
            lineArray)

          this.setState({ canvas: newCanvas }, () => {
            this.addToHistory()
          });

          break;
        case findCopyItemsId(source.droppableId):
          newCanvas[destination.droppableId] = copy(
            findCopyItems(source.droppableId),
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
        default:
          newCanvas = move(
            this.state.canvas[source.droppableId],
            this.state.canvas[destination.droppableId],
            source,
            destination,
            algorithm,
            lineArray
          )

          let merged = { ...this.state.canvas, ...newCanvas };
          this.setState({ canvas: merged }, () => {
            this.addToHistory()
          });
          break;
      }

      this.calculateResults()
      //console.log("Algor: " + localStorage.getItem("algorithm"));
      //console.log(this.state.canvas);
    }
  };

  onNewLine = () => {
    //Create a new List
    if (!this.state.is_submitted) {
      var id = uuid();
      let newCanvas = this.state.canvas;
      newCanvas[id] = [];
      this.setState({ canvas: newCanvas });
      lineArray[lineArray.length] = [lineArray.length, id];
      algorithm[algorithm.length] = [];
      this.calculateResults();
    }
  }

  onCreate = () => {
    // Checks the algorithm has been saved
    // if not, prompts user to save
    // Otherwise, clears session and begins a new one
    if (this.state.saved || window.confirm("You have unsaved changes - are you sure you want to create a new algorithm?")) {
      resetTempStorage();
      window.location.href = '/dnd';
    }
  }

  onLoad = (algorithm_name) => {
    this.load(algorithm_name);
  }
  
  load = async (algorithm_name) => {
    try {
      const student_id = getUserID();
      const loaded_alg = await retrieveCircuits({'student_id': student_id, 'circuit_name': algorithm_name, 'is_deleted': 0});
      console.log("alg name:", algorithm_name);
      
      if (loaded_alg) {
        /*
        var id = lineArray[0][1];
        this.setState({ canvas: { [id]: getItems(0) } });
        algorithm[0] = getItems(0);
        console.log(this.state.canvas[id]);
    
        if (algor === null) { return; }
        else {
          var length = algor.length;
    
          for (var j = 1; j < length; j++) {
            var id = uuid();
            this.setState({ canvas: { [id]: getItems(j) } });
            lineArray[lineArray.length] = new Array(lineArray.length, id);
            algorithm[algorithm.length] = getItems(j);
          }
        }
        console.log(this.state.canvas);
        */
        alert(`"${algorithm_name}" has been loaded`)

      } else {
        alert("Something went wrong and the selected algorithm couldn't be loaded")
      }
      
    } catch (error) {
      console.log(error);
      alert(`An error occured: "${error}"`);
    }
  }

  // Refreshes the page so user can restart algorithm
  onDelete = () => {
    this.delete();
  }

  delete = async (algorithm_name) => {
    try {
      // Delete from database
      // Delete from local storage
      if (!this.state.is_submitted) {
        const student_id = getUserID();
        const deleted = await deleteCircuit(student_id, algorithm_name);
        if (!deleted) {
          alert("Something went wrong and the current algorithm couldn't be deleted")
        } else {
          alert(`"${algorithm_name}" was deleted successfully!`)
          // resetTempStorage();
          window.location.href = '/dnd';
        }
      }
    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }

  }

  // Gets a list of the names of all the algorithms made by a user
  getList = async () => {
    let student_id = getUserID();
    var list = [];
    const results = await retrieveCircuits({ 'student_id': student_id, 'is_deleted': 0});
    for (var i = 0; i < results['circuits'].length; i++) {
      list[i] = [results['circuits'][i]['circuit_name'], results['circuits'][i]['is_submitted']];
    }
    list.sort((a, b) => {
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    });
    this.setState({ loaded_algs: list, filtered_algs: list });
    console.log(this.state.loaded_algs);
  }

  filterAlgorithms = (e) => {
    e.preventDefault();
    const filter_string = (e.target.value).toLowerCase();
    
    console.log(this.state.filter);
    let filtered_list = [];
    const loaded_list = this.state.loaded_algs;
    for (var i = 0; i < loaded_list.length; i++) {
      if ((loaded_list[i][0].toLowerCase()).includes(filter_string)) filtered_list.push(loaded_list[i]);
    }
    this.setState({
      filter: filter_string,
      filtered_algs: filtered_list
    });
    //this.forceUpdate();
  }

  // Submits the algorithm
  onSubmit = () => {
    this.submit();
  }

  submit = async () => {
    let submitted = false;
    try {
      const valid = verifyCircuit(algorithm);
      if (valid == "valid") {
        let saved = JSON.parse(localStorage.getItem("saved"));
        if (!saved) saved = await this.save();

        if (saved) {
          let submit = window.confirm("Are you sure you want to submit?");
          const studentid = getUserID();
          if (submit && studentid) {
            const algorithm_name = getAlgorithmName();
            submitted = await submitCircuit(studentid, algorithm_name);
            if (submitted) {
              alert(`Your algorithm "${algorithm_name}" has been succesfully submitted!`);
              this.setState({ is_submitted: true });
            }
            else alert("Something went wrong and your algorithm couldn't be submitted");
          }
        }
      } else alert("Make sure your algorithm is valid before submitting");
    } catch (error) {
      console.log(error);
      alert(`An error occured: "${error}"`);
    }
    return submitted;
  }

  calculateResults = () => {
    let circuit_input = getCircuitInput(algorithm);
    let valid_msg = verifyCircuit(algorithm)
    getResults(circuit_input).then(res => {
      this.setState({ results: res });
      //console.log("results:", this.state.results)
    });
    this.setState({ circuit_valid_msg: valid_msg })
    this.forceUpdate();
  }

  onSave = () => {
    this.save();
    this.getList();
  }

  save = async () => {
    let saved = false;
    try {
      const studentid = getUserID();
      const circuit_input = escapeSpecialCharacters(getCircuitInput(algorithm));
      const circuit_output = escapeSpecialCharacters(this.state.results);
      var algorithm_name = getAlgorithmName()
      const new_save = algorithm_name === "null" || algorithm_name.length === 0;

      if (new_save) {
        var valid = false;
        do {
          algorithm_name = window.prompt("Please name your algorithm:");
          valid = await isValidAlgorithmName(algorithm_name);
        } while (algorithm_name !== null && !valid)

        if (valid) {
          saved = await saveCircuit(studentid, algorithm_name, circuit_input, circuit_output);
          if (saved) {
            setAlgorithmName(algorithm_name);
            this.setState({ is_new: false, algorithm_name: algorithm_name });
          }
        }

      } else {
        if (studentid) {
          saved = await saveCircuit(studentid, algorithm_name, circuit_input, circuit_output, true);
        }
      }
      if (saved && algorithm_name) {
        //localStorage.setItem("saved", true);
        this.setState({ saved: true });
        alert(`Your algorithm "${algorithm_name}" has been succesfully saved!`);
      } else if (algorithm_name) alert("Something went wrong and your algorithm couldn't be saved");
    } catch (error) {
      console.log(error);
      alert(`An error occured: "${error}"`);
    }
    return saved;
  }

  addToHistory = () => {
    var vers = parseInt(sessionStorage.getItem("currentversion")) + 1;
    history[vers] = { ... this.state.canvas };
    history.slice(0, vers);
    sessionStorage.setItem("currentversion", vers);
    sessionStorage.setItem("finalversion", vers);
    //localStorage.setItem("saved", false);
    this.setState({ saved: false });
    this.undoButton.current.disabled = (vers === 0);
    this.redoButton.current.disabled = true;
  }

  onUndo = () => {
    if (!this.state.is_submitted) {
      var vers = parseInt(sessionStorage.getItem("currentversion"));
      var finalvers = parseInt(sessionStorage.getItem("finalversion"));
      if (vers > 0) {

        vers = vers - 1;
        this.setState({
          canvas:
            history[vers]
        }, () => {
          for (var i = 0; i < lineArray.length; i++) {
            algorithm[i] = [];
            [this.state.canvas[lineArray[i][1]]].map(function (item) {
              algorithm[i].push(item[0]);
            });
          }
          localStorage.setItem('algorithm', JSON.stringify(algorithm));
          this.calculateResults();
        });
        sessionStorage.setItem("currentversion", vers);
        this.undoButton.current.disabled = (vers === 0);
        this.redoButton.current.disabled = (vers === finalvers);
      }
    }
  }

  onRedo = () => {
    if (!this.state.is_submitted) {
      var vers = parseInt(sessionStorage.getItem("currentversion"));
      var finalvers = parseInt(sessionStorage.getItem("finalversion"));
      if (vers < finalvers) {
        vers = vers + 1;
        this.setState({
          canvas:
            history[vers]
        }, () => {
          for (var i = 0; i < lineArray.length; i++) {
            algorithm[i] = [];
            [this.state.canvas[lineArray[i][1]]].map(function (item) {
              algorithm[i].push(item[0]);
            });
          }
          localStorage.setItem('algorithm', JSON.stringify(algorithm));
          this.calculateResults();
        });
        sessionStorage.setItem("currentversion", vers);
        this.undoButton.current.disabled = (vers === 0);
        this.redoButton.current.disabled = (vers === finalvers);
      }
    }
  }

  onExport = () => {
    //Check it has been saved first

    //submit to database
    if (localStorage.getItem("algorithm") !== "null") {
      if (localStorage.getItem("saved") !== "false") {
        download(localStorage.getItem('algorithm'), "algorithm.json", "text/json");
        return;
      }

      alert("You must first save your algorithm.");
      return;
    }

    alert("You have not created an algorithm yet.");
  }

  deleteLine = (list, i) => {
    if (!this.state.is_submitted) {
      if (algorithm.length === 1) {
        alert("You cannot delete this line");
        return;
      }
      let newState = this.state.canvas;
      delete newState[list];
      this.setState({ canvas: newState });
      algorithm.splice(i, 1);
      lineArray.splice(i, 1);
      //console.log(algorithm);
      for (var j = i; j < lineArray.length; j++) {
        lineArray[j][0]--;
      }
      //console.log(lineArray);
      localStorage.setItem("algorithm", JSON.stringify(algorithm));
      this.addToHistory();
      this.calculateResults();
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const student_id = getUserID();
    if (student_id) {
      return (
        <div className="App">
          <NavBar />
          <body onLoad={this.onLoad}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div class="row">
                <div class="col-8">
                  <div class="row" style={{ margin: '8px', padding: '10px' }}>
                    <div className="col">
                      <button style={{ float: 'left' }} class="btn btn-primary" onClick={this.onCreate}>Create New</button>
                    </div>
                    <div className="col">
                      <Dropdown  >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={this.state.loaded_algs.length===0}>
                          Load
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{maxHeight:350, overflow:'auto', maxWidth:200}}>
                          <input placeholder="Type to filter..." style={{margin:10}} type="text" value={this.state.filter} onChange={this.filterAlgorithms} />
                          {this.state.filtered_algs.map((alg, index) => {
                            return(<Dropdown.Item style={alg[1]===1 ? {backgroundColor:"powderblue"} : {}} key={index} onClick={() => this.onLoad(alg[0])}>{alg[0]}</Dropdown.Item>)
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onDelete} disabled={this.state.is_submitted || this.state.is_new} >Delete</button>
                    </div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onExport}>Export</button>
                    </div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onSubmit} disabled={this.state.is_submitted} >Submit</button>
                    </div>
                  </div>
                  <div class="row" style={{ margin: '8px', padding: '10px' }}>
                    <div className="col">
                      <button style={{ float: 'left' }} class="btn btn-primary" onClick={this.onNewLine} disabled={this.state.is_submitted} >Add Wire</button>
                    </div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onSave} disabled={this.state.is_submitted} >Save</button>
                    </div>
                    <div className="col"></div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onUndo} ref={this.undoButton} disabled={this.state.is_submitted} >Undo</button>
                    </div>
                    <div className="col">
                      <button style={{ float: 'right' }} class="btn btn-primary" onClick={this.onRedo} ref={this.redoButton} disabled={this.state.is_submitted} >Redo</button>
                    </div>
                  </div>
                  <Content className="algorithm-container" style={{ overflowX:'scroll' }}>
                    <Title>Create Your Algorithm: {this.state.algorithm_name} </Title>
                    {Object.keys(this.state.canvas).map((list, i) => (
                      <div className="wire-container">
                        <Button onClick={() => this.deleteLine(list, i)}>X</Button>
                        <Algorithm key={i} list={list} state={this.state.canvas} isAdmin={false} style={{ float: 'left' }} />
                      </div>
                    ))}
                  </Content>
                  <Content>
                  <Alert style={{ marginLeft: 20 }} variant='info' show={!this.state.saved} > You have unsaved changes</Alert>
                    <Alert style={{ marginLeft: 20 }} variant='warning' show={this.state.circuit_valid_msg !== "valid"} >{this.state.circuit_valid_msg}</Alert>
                    <Alert style={{ marginLeft: 20 }} variant='success' show={this.state.is_submitted && !this.state.is_graded} >
                      <Alert.Heading>Successfully submitted</Alert.Heading>
                    </Alert>
                    <Alert style={{ marginLeft: 20 }} variant='success' show={this.state.is_submitted && this.state.is_graded} >
                      <Alert.Heading>Successfully submitted and graded: {this.state.grade}/100</Alert.Heading>
                    </Alert>
                    <Results resultChartData={this.state.results} title={"Measurement Probability Graph"} width={400} height={120} />
                  </Content>
                </div>
                <div class="col-4">
                  <Title>Toolbox</Title>
                  <div className="row" style={{ paddingLeft: '5%' }}>
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
                  </div>
                  <div className="row" style={{ paddingLeft: '5%' }}>
                    <div class="col" style={{ padding: 0 }}>
                      <SubTitle>Eighth Turns</SubTitle>
                      <Toolbox droppableId="EIGHTH_TURNS" list={EIGHTH_TURNS} />
                    </div>
                  </div>
                  <div className="row" style={{ paddingLeft: '5%' }}>
                    <div class="col" style={{ padding: 0 }}>
                      <SubTitle>Miscellaneous</SubTitle>
                      <Toolbox droppableId="EMPTY" list={EMPTY} />
                      <Toolbox droppableId="PROBES" list={PROBES} />
                    </div>
                  </div>
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
