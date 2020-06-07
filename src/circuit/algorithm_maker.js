
import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// This file makes the droppable region for the algorithm maker
// It is called in the main.js file

// Data files
import PROBES from './data/probes.js';
import HALF_TURNS from './data/half_turns.js';
import QUARTER_TURNS from './data/quarter_turns.js';
import EIGHTH_TURNS from './data/eighth_turns.js';

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

const gateSets = [PROBES, HALF_TURNS, QUARTER_TURNS, EIGHTH_TURNS];
var gateData = {'name': new Set(), 'content': new Set()};
var probeData = {'name': new Set(), 'content': new Set()};

for (var i = 0; i < gateSets.length; i++) {
    for (var j = 0; j < gateSets[i].length; j++) {
        gateData['name'].add(gateSets[i][j].name);
        gateData['content'].add(gateSets[i][j].content);
    }
}

for (var j = 0; j < PROBES.length; j++) {
    probeData['name'].add(PROBES[j].name);
    probeData['content'].add(PROBES[j].content);
}

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

  var included_indices = new Set();
  for (const item in state) {
    for (var j = 0; j < state[item].length; j++) {
        if (probeData['name'].has(state[item][j].name) || probeData['content'].has(state[item][j].content)) {
            if (!included_indices.has(j)) included_indices.add(j);
        }
    }
  }

  for (const item in state) {

      for (var i = 0; i < state[item].length; i++) {
        
        let block = state[item][i];
        let included = included_indices.has(i);
        let notempty = block.name !== 'Empty';
        if (included && notempty) {
            if (gateData['name'].has(block.name)) {
                if (prevBlocks[i] >= 0) {
                    state[item][i]['addStyle'] = true;
                    state[item][i]['dist'] = index - prevBlocks[i];
                    prevBlocks[i] = index;
                } else {
                    prevBlocks[i] = index; 
                }
            } else {
                prevBlocks[i] = -1;
                if (state[item][i].content !== 'Swap') state[item][i]['addStyle'] = false;
            }
            
        }
        /*
        if (included && notempty && prevBlocks[i] >= 0 && gateData['name'].has(block.name) ) {
            state[item][i]['addStyle'] = true;
            state[item][i]['dist'] = index - prevBlocks[i];
            prevBlocks[i] = index;
        }
        else if (included && notempty) {
            if (gateData['name'].has(block.name)) {
                prevBlocks[i] = index; 
            }
            else {
                prevBlocks[i] = -1;
            }
            if (state[item][i].content !== 'Swap') state[item][i]['addStyle'] = false;
        }*/
          
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
