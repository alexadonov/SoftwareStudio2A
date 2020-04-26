import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import download from 'downloadjs';
import {saveCircuit} from '../circuit/apicaller';

// Main components
import NavBar from "../components/navBar.js";
import Toolbox from './toolbox.js';
import Algorithm from './algorithm_maker';

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

//This save the algorithm the user creates as an array
var algorithm = new Array();
var lineArray = new Array();

const getId =(droppableDestination) => {
  var id;
  for(var i=0; i < lineArray.length; i++) {
    if(droppableDestination.droppableId === lineArray[i][1]) {
      id = lineArray[i][0];
    }
  }
  return id;
}

// The next 3 functions allow the items to be moved
// If moving from the toolbox to the algorithm maker,
// You need to make a copy, hence copy() is called
// Reorder only works for the algorithm maker

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex, droppableDestination) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    var destination_id = getId(droppableDestination);
    algorithm[destination_id][1].splice(endIndex, 0, algorithm[destination_id][1].splice(startIndex, 1)[0]);
    localStorage.setItem("algorithm", JSON.stringify(algorithm));
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];


    var destination_id = getId(droppableDestination);
    algorithm[destination_id][1].splice(droppableDestination.index, 0, item.content);
    localStorage.setItem("algorithm", JSON.stringify(algorithm));

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

    return destClone;
};

const remove = (source, droppableSource) => {
    const sourceClone = Array.from(source);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    sourceClone.splice(removed, 0);

    var source_id = getId(droppableSource);
    algorithm[source_id][1].splice(droppableSource.index, 1);
    localStorage.setItem('algorithm', JSON.stringify(algorithm));

    const result = {};
    result[droppableSource.droppableId] = sourceClone;

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    copy(source, destination, droppableSource, droppableDestination);
    remove(source, droppableSource);

    localStorage.setItem('algorithm', JSON.stringify(algorithm));

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getLargestRow = () => {
  var currentMax = 0;
  for(var i = 0; i < algorithm.length; i++) {
    if(algorithm[i][1].length > currentMax) {
      currentMax = algorithm[i][1].length;
    }
  }
  return currentMax;
}

const removeUndefined = () => {
  for(var a = 0; a < getLargestRow(); a++) {
    for(var i = 0; i < algorithm.length; i++) {
        if(algorithm[i][1][a] === undefined) {
          algorithm[i][1][a] = "1";
        }
    }
  }
}

const getCircuitInput = () => {
  removeUndefined();
  var circuit_input = new Array();
  var column = new Array();
  var k = 0;
  var p = 0;
  for(var a = 0; a < getLargestRow(); a++) {
    for(var i = 0; i < algorithm.length; i++) {
        column[k] = algorithm[i][1][p];
        k++;
    }
    circuit_input[a] = column;
    p++;
    column = [];
    k=0;
  }
  console.log(circuit_input);
  return circuit_input;
}

const verifyCircuit = () => {
  //Loop through the array to check all conditions are met
  //Maybe make a new file for this
  //e.g. there has to be 2 gates

  //"SWAP" needs 2 in the same column
  var circuit_input = getCircuitInput();
  if(circuit_input.length === 0) {
    alert("This algorithm is empty!");
    return false;
  }
  var count = 0;
  for(var i = 0; i < circuit_input.length; i++) {
    for(var j=0; j < circuit_input[i].length; j++) {
      if(circuit_input[i][j] === "Swap") {
        count++;
      }
    }
    if(count === 1 ) {
      alert("You need 2 SWAPS in one column");
      return false;
    }
    count = 0;
  }
  return true;
}

const findCopyItems = (id) => {
  switch(id) {
    case "DISPLAYS": { return DISPLAYS; }
    case "PROBES": { return PROBES; }
    case "HALF_TURNS": { return HALF_TURNS; }
    case "QUARTER_TURNS": { return QUARTER_TURNS; }
    case "EIGHTH_TURNS": { return EIGHTH_TURNS; }
    case "PARAMETRIZED": { return PARAMETRIZED; }
    case "SAMPLING": { return SAMPLING; }
    case "PARITY": { return PARITY; }
    case "EMPTY": { return EMPTY; }
    default: return;
  }
}

export default class Main extends Component {

    //This just sets the state of the list
    constructor(props) {
      super(props);
      var id = uuid();
        this.state = {
          [id]: [],
      };
      lineArray[0] = new Array(0, id);
      algorithm[0] = new Array(0, new Array());
    }

    componentDidMount() {
      //Load last saved algorithm if any
      localStorage.getItem('algorithm');
      console.log("Line " + lineArray.length + ": " + lineArray[0]);
    }

    // This is what combines everything to make move items work
    // This reads the source list and destination list to figure out
    // What is meant to happen
    onDragEnd = result => {
        const { source, destination } = result;

        if((source.droppableId === "DISPLAYS" ||
            source.droppableId === "PROBES" ||
            source.droppableId === "HALF_TURNS" ||
            source.droppableId === "QUARTER_TURNS" ||
            source.droppableId === "EIGHTH_TURNS" ||
            source.droppableId === "PARAMETRIZED" ||
            source.droppableId === "SAMPLING" ||
            source.droppableId === "PARITY" ||
            source.droppableId === "EMPTY" ) &&
            (!destination || source.droppableId === destination.droppableId)) {
          return;
        }

        // dropped outside the list
        if (!destination) {
          this.setState(
              remove(
                  this.state[source.droppableId],
                  source,
              )
          );
          console.log("Algor: " + localStorage.getItem("algorithm"));
          return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index,
                        destination
                    )
                });
                break;
            case source.droppableId:
                this.setState({
                    [destination.droppableId]: copy(
                        findCopyItems(source.droppableId),
                        this.state[destination.droppableId],
                        source,
                        destination
                    ),
                });
                break;
            default:
                break;
        }

        console.log("Algor: " + localStorage.getItem("algorithm"));
    };

    onCreate = () => {
      //Create a new List
      var id = uuid();
      this.setState({ [id]: [] });
      lineArray[lineArray.length] = new Array(lineArray.length, id);
      algorithm[algorithm.length] = new Array(algorithm.length, new Array());
    }

    onLoad = () => {
      //Searches database for all algorithms the user has saved
      // Shows a drop down list of these so the user can choose
    }

    // Refreshes the page so user can restart algorithm
    onDelete = () => {
      window.location.reload(false);
      localStorage.setItem('algorithm', null);
    }

    // Submits the algorithm
    onSubmit = () => {
      //Only show this button if algorithm has been saved

      //submit to database
      verifyCircuit();

      //Make algorithm read only
    }

    onSave = () => {
      var studentid = 98106545; //getStudentID();
      
      var circuit_input = getCircuitInput();
      if(verifyCircuit() === false) { return; }
      var algorithm_name = window.prompt("Please name your algorithm:");
      while(algorithm_name != null && algorithm_name.length === 0) {
        alert("Please enter a valid name.");
        algorithm_name = window.prompt("Please name your algorithm:");
      }
      if (algorithm_name != null && algorithm_name.length != 0) {
        localStorage.setItem(algorithm_name, circuit_input);
        var alg = localStorage.getItem("algorithm");
        saveCircuit(studentid, algorithm_name, alg, "no results");
        alert("Your algorithm as been succesfully saved!");
      }
      /*
      if (window.confirm("Would you like to start a new algorithm?")) {
        localStorage.clear('algorithm');
        window.location.href = '/dnd';
      } else {
        return;
      }
      */
    }


    onExport = () => {
      //Check it has been saved first

      //submit to database
      if(localStorage.getItem('algorithm') === undefined) {
        alert("You have not created an algorithm yet.", "algorithm.html", "text/html");
        return;
      }
      download(localStorage.getItem('algorithm'), "algorithm.html", "text/html");
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
               <div class="row" style={{margin:'8px', padding: '1%'}}>
                 <div className="col">
                   <button style={{float: 'left'}} class="btn btn-primary" onClick={this.onCreate}>Create</button>
                 </div>

                 <div className="col">
                   <button style={{float: 'left'}} class="btn btn-success" onClick={this.onLoad}>Load</button>
                 </div>

                 <div className="col">
                   <button style={{float: 'right'}} class="btn btn-secondary" onClick={this.onSubmit}>Submit</button>
                 </div>

                 <div className="col">
                   <button style={{float: 'left'}} class="btn btn-success" onClick={this.onDelete}>Delete</button>
                 </div>

                 <div className="col">
                   <button style={{float: 'right'}} class="btn btn-primary" onClick={this.onSave}>Save</button>
                 </div>

                 <div className="col">
                   <button style={{float: 'right'}} class="btn btn-success" onClick={this.onExport}>Export</button>
                 </div>
               </div>
                <Content>
                  <Title>Create Your Algorithm</Title>
                    {Object.keys(this.state).map((list, i) => (
                      <Algorithm key={i} list={list} state={this.state}/>
                    ))}
                </Content>
                <Content>
                    <h6 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Graph goes here</h6>
                </Content>
                </div>

                <div class="col-4">
                  <Title>Toolbox</Title>

                  <div className="row" style={{paddingLeft: '5%'}}>
                    <div class="col" style={{padding: 0}}>
                      <SubTitle>Display's</SubTitle>
                      <Toolbox droppableId="DISPLAYS" list={DISPLAYS}/>
                    </div>
                    <div class="col" style={{padding: 0}}>
                      <SubTitle>Probes</SubTitle>
                      <Toolbox droppableId="PROBES" list={PROBES}/>
                    </div>
                    <div class="col" style={{padding: 0}}>
                      <SubTitle>Half Turns</SubTitle>
                      <Toolbox droppableId="HALF_TURNS" list={HALF_TURNS}/>
                    </div>
                  </div>

                    <div className="row" style={{paddingLeft: '5%'}}>
                      <div class="col" style={{padding: 0}}>
                        <SubTitle>Quarter Turns</SubTitle>
                        <Toolbox droppableId="QUARTER_TURNS" list={QUARTER_TURNS}/>
                      </div>
                      <div class="col" style={{padding: 0}}>
                        <SubTitle>Eighth Turns</SubTitle>
                        <Toolbox droppableId="EIGHTH_TURNS" list={EIGHTH_TURNS}/>
                      </div>
                      <div class="col" style={{padding: 0}}>
                        <SubTitle>Parametrized</SubTitle>
                        <Toolbox droppableId="PARAMETRIZED" list={PARAMETRIZED}/>
                      </div>
                    </div>

                    <div className="row" style={{paddingLeft: '5%'}}>
                      <div class="col" style={{padding: 0}}>
                          <SubTitle>Sampling</SubTitle>
                          <Toolbox droppableId="SAMPLING" list={SAMPLING}/>
                        </div>
                        <div class="col" style={{padding: 0}}>
                          <SubTitle>Parity</SubTitle>
                          <Toolbox droppableId="PARITY" list={PARITY}/>
                        </div>
                        <div class="col" style={{padding: 0}}>
                          <SubTitle>Empty </SubTitle>
                          <Toolbox droppableId="EMPTY" list={EMPTY}/>
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
