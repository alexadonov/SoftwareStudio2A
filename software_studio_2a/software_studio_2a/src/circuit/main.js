import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import download from 'downloadjs';

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

// All CSS for this file
// Each div as been created with a name (see below)
// You can then use that in the HTML instead of the word div
// This just makes the code nicer and easier to read
const Content = styled.div``;

const Removed = styled.div`
  background-image: url('https://image.flaticon.com/icons/svg/1214/1214428.svg');
  background-repeat: no-repeat;
  background-size: 60px 60px;
  margin: 8px;
  padding: 1%;
  margin-left: 1%;
  background-position: left center;
  display: flex;
`;

const Title = styled.h3`
  margin: 8px;
  padding-top: 1%;
  padding-left: 2%;
`;

const SubTitle = styled.h5`
  margin: 8px;
  padding-top: 1%;
`;

const COLUMN = styled.div`
  float: 'left';
`;

//This save the algorithm the user creates as an array
var algorithm = new Array();

// The next 3 functions allow the items to be moved
// If moving from the toolbox to the algorithm maker,
// You need to make a copy, hence copy() is called
// Reorder only works for the algorithm maker

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    algorithm.splice(endIndex, 0, algorithm.splice(startIndex, 1)[0]);

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

    algorithm.splice(droppableDestination.index, 0, item.content);
    localStorage.setItem("algorithm", JSON.stringify(algorithm));

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

    return destClone;
};

const remove = (source, droppableSource) => {
    const sourceClone = Array.from(source);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    sourceClone.splice(removed, 0);
    algorithm.splice(droppableSource.index, 1);
    localStorage.setItem('algorithm', JSON.stringify(algorithm));
    const result = {};
    result[droppableSource.droppableId] = sourceClone;

    return result;
};

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
    default: return;
  }
}

export default class Main extends Component {

    //This just sets the state of the list
    state = {
        [uuid()]: [],
    };

    componentDidMount() {
      //Load last saved algorithm if any
      localStorage.getItem('algorithm');
    }

    // This is what combines everything to make move items work
    // This reads the source list and destination list to figure out
    // What is meant to happen
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if(source.droppableId ==='ITEMS' && destination.droppableId === 'remove') {
          return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
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
                this.setState(
                    remove(
                        this.state[source.droppableId],
                        source,
                    )
                );
                break;
        }

      console.log("Algor: " + localStorage.getItem("algorithm"));
    };

    onCreate = () => {
      //Create a new List
      this.setState({ [uuid()]: [] });
    }

    onLoad = () => {
      //Searches database for all algorithms the user has saved
      // Shows a drop down list of these so the user can choose
    }

    // Refreshes the page so user can restart algorithm
    onRefresh = () => {
      window.location.reload(false);
    }

    // Submits the algorithm
    onSubmit = () => {
      //submit to database
    }

    onSave = () => {
        localStorage.setItem('algorithm', this.state.algorithm);
    }

    onExport = () => {
      //submit to database
      if(localStorage.getItem('algorithm') === undefined) {
        download("You have not created an algorithm yet.", "algorithm.html", "text/html");
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
              <body onload={this.onLoad}>

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
                  <button style={{float: 'left'}} class="btn btn-success" onClick={this.onRefresh}>Delete</button>
                </div>

                <div className="col">
                  <button style={{float: 'right'}} class="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>

                <div className="col">
                  <button style={{float: 'right'}} class="btn btn-success" onClick={this.onExport}>Export</button>
                </div>
              </div>

            <DragDropContext onDragEnd={this.onDragEnd}>
                <Content>
                  <Title>Create Your Algorithm</Title>
                    {Object.keys(this.state).map(list => (
                      <Algorithm list={list} state={this.state}/>
                    ))}
                </Content>

                <Title>Toolbox</Title>
                <div className="row" style={{paddingLeft: '5%'}}>
                  <COLUMN>
                    <SubTitle>Display's</SubTitle>
                    <Toolbox droppableId="DISPLAYS" list={DISPLAYS}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Probes</SubTitle>
                    <Toolbox droppableId="PROBES" list={PROBES}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Half Turns</SubTitle>
                    <Toolbox droppableId="HALF_TURNS" list={HALF_TURNS}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Quarter Turns</SubTitle>
                    <Toolbox droppableId="QUARTER_TURNS" list={QUARTER_TURNS}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Eighth Turns</SubTitle>
                    <Toolbox droppableId="EIGHTH_TURNS" list={EIGHTH_TURNS}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Parametrized</SubTitle>
                    <Toolbox droppableId="PARAMETRIZED" list={PARAMETRIZED}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Sampling</SubTitle>
                    <Toolbox droppableId="SAMPLING" list={SAMPLING}/>
                  </COLUMN>
                  <COLUMN>
                    <SubTitle>Parity</SubTitle>
                    <Toolbox droppableId="PARITY" list={PARITY}/>
                  </COLUMN>
                </div>

                  <Droppable droppableId="remove" style={{minHeight: '100px', minWidth: '100px'}}>
                  {(provided, snapshot) => (
                      <Removed
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}>
                            <div className="col" style={{minWidth: '50px', minHeight: '100px'}}>
                            </div>
                        </Removed>
                    )}
                  </Droppable>
            </DragDropContext>
            </body>
            </div>
        );
    }
}
