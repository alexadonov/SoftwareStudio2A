
import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// This file makes the droppable region for the algorithm maker
// It is called in the main.js file

const Notice = styled.h5`
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  color: rgba(0,0,0,0.5);
`;

const Container = styled.div`
    min-height: 10vh;
    background-color: ${props => (props.isDraggingOver ? 'lightblue' : 'transparant')};
    border-bottom: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    margin: 8px;
    padding: 1%;
    display: flex;
`;

const Item = styled.image`
  border: 3px solid darkgrey;
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.2);
  border-radius: 2px;
  padding: 8px;
  margin: 8px;
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDragging ? 'darkgrey' : 'white')};
`;

const ALGORITHM_MAKER = (props) => {
  const list = props.list;
  const state = props.state;

  return (
        <Droppable key={list} droppableId={list} direction="horizontal">
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}>
                    {state[list].length
                        ? state[list].map(
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
                                              <img src={item.image} />
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
  );
}

export default ALGORITHM_MAKER;
