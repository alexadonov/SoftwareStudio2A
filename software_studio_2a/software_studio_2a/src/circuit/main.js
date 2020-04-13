import React, { Component } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ITEMS from './items.js'
import NavBar from "../components/navBar.js";

// All CSS for this file
// Each div as been created with a name (see below)
// You can then use that in the HTML instead of the word div
// This just makes the code nicer and easier to read
const Content = styled.div``;

const Item = styled.div`
border: 3px solid darkgrey;
border-radius: 2px;
padding: 8px;
margin-right: 8px;
width: 120px;
height: 70px;
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => (props.isDragging ? 'darkgrey' : 'white')};
`;

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
  background-color: white;
  border: 2px solid grey;
  margin: 8px;
  padding: 1%;
  display: flex;
`;

const Container = styled(List)`
    min-height: 10vh;
    background-color: ${props => (props.isDraggingOver ? 'lightblue' : 'white')};
    border: 2px solid ${props => (props.isDraggingOver ? 'lightblue' : 'grey')};
    margin: 8px;
    padding: 1%;
    display: flex;
`;

const Notice = styled.h5`
width: auto; /*can be in percentage also.*/
  height: auto;
  margin: 0 auto;
  padding: 10px;
  position: relative;
    color: rgba(0,0,0,0.5);
`;

const Title = styled.h3`
  margin: 8px;
  padding-top: 1%;
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

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export default class Main extends Component {

    //This just sets the state of the list
    state = {
        [uuid()]: [],
    };


    // This is what combines everything to make move items work
    // This reads the source list and destination list to figure out
    // What is meant to happen
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
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
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    ),
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }


      console.log("Algor: " + localStorage.getItem("algorithm"));
    };

    // If we want to add more lists, this will do the job
    // Note this is not implemented yet but here for future use
    addList = e => {
        this.setState({ [uuid()]: [] });
    };

    // Refreshes the page so user canr restart algorithm
    onRefresh = () => {
      window.location.reload(false);
    }

    // Submits the algorithm
    onSubmit = () => {

    }
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
          <div className="App">
            <NavBar />
              <body >
            <DragDropContext onDragEnd={this.onDragEnd}>

                <Content>
                <Title>Create Your Algorithm</Title>
                    {Object.keys(this.state).map((list, i) => (
                        <Droppable key={list} droppableId={list} direction="horizontal">
                            {(provided, snapshot) => (
                                <Container
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    {this.state[list].length
                                        ? this.state[list].map(
                                              (item, index) => (
                                                  <Draggable
                                                      key={item.id}
                                                      draggableId={item.id}
                                                      index={index}>
                                                      {(provided, snapshot) => (
                                                          <Item
                                                              ref={ provided.innerRef }
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              isDragging={ snapshot.isDragging }
                                                              style={ provided.draggableProps.style}>
                                                              {item.content}
                                                          </Item>
                                                      )}
                                                  </Draggable>
                                              )
                                          )
                                        : provided.placeholder && (
                                              <Notice>Drop items here</Notice>
                                          )}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    ))}
                </Content>



                <Title>Toolbox</Title>
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Kiosk>
                    )}
                </Droppable>

            </DragDropContext>


            <div class="row" style={{margin:'8px', paddin: '1%'}}>
              <div className="col">
                  <h4>Instructions</h4>
                  <ul>
                    <li>Drag the toolbox item above the line</li>
                    <li>Click "Restart" to reset your progress</li>
                    <li>When you are happy with your solution, click the "Submit" button</li>
                  </ul>
                </div>
              </div>

              <div class="row" style={{margin:'8px', paddin: '1%'}}>
                      <div className="col">
                        <button style={{float: 'left'}} class="btn btn-primary" onClick={this.onRefresh}>Restart</button>
                      </div>


                      <div className="col">
                        <button style={{float: 'right'}} class="btn btn-success" onClick={this.onSubmit}>Submit</button>
                      </div>

              </div>
            </body>
            </div>
        );
    }
}
