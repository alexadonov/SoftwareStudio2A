
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
    background-image: url('https://pngriver.com/wp-content/uploads/2018/04/Download-Horizontal-Line-PNG-Transparent-Image-300x155.png');
    background-size: 93.75rem 5rem;
    background-repeat: no-repeat;
    margin: 8px;
    padding: 10px;
    display: flex;
`;

const Item = styled.div`
  z-index: 100;
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
  const isAdmin = props.isAdmin;
  
  
  // ideally this shouldn't exist
  let prevBlocks = {};
  let index = 0;

  // for swap gates
  for (const item in state) {
      for (var i = 0; i < state[item].length; i++) {
          
        let block = state[item][i];
        if (block.name !== 'Empty') {
            if (prevBlocks[i] >= 0 && block.content === 'Swap') {
                state[item][i]['addStyle'] = true;
                state[item][i]['dist'] = index - prevBlocks[i];
                prevBlocks[i] = -1
            }
            else {
                if (block.content === 'Swap') {
                    prevBlocks[i] = index; 
                }
                else {
                    prevBlocks[i] = -1;
                }
                state[item][i]['addStyle'] = false;
            }
        }
          
    }
    index++;
  }

  prevBlocks = {};
  index = 0;

  // for swap gates
  for (const item in state) {
      for (var i = 0; i < state[item].length; i++) {
          
        let block = state[item][i];
        if (prevBlocks[i] >= 0 && ['Pauli X Gate', 'Hadamard Gate', 'Control', 'Anti-Control'].includes(block.name) ) {
            state[item][i]['addStyle'] = true;
            state[item][i]['dist'] = index - prevBlocks[i];
            prevBlocks[i] = index;
        }
        else {
            if (['X', 'H', 'Control', 'Anti-Control'].includes(block.content)) {
                prevBlocks[i] = index; 
            }
            else {
                prevBlocks[i] = -1;
            }
            if (state[item][i].content != 'Swap') state[item][i]['addStyle'] = false;
        }
          
    }
    index++;
  }

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
                                      index={index}
                                      isDragDisabled={isAdmin}>
                                      {(provided, snapshot) => (
                                          <Item
                                              ref={ provided.innerRef }
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              isDragging={ snapshot.isDragging }
                                              style={ provided.draggableProps.style}
                                              className={ (item.addStyle ? 'bottom-connector bottom-connector-'+item.dist : '')}>
                                              {item.content}
                                          </Item>
                                      )}
                                  </Draggable>
                              )
                          )
                        : provided.placeholder && (
                              <Notice></Notice>
                          )}
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
  );
}

export default ALGORITHM_MAKER;
