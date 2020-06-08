import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
import Card from '../components/card.js';
// This file shows all the items being declared and makes them draggable
// In main.js, this function is called and that is where the list of items
// is specified


const Kiosk = styled.div`
  background-color: white;
  background: #fff;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Hover = styled.div`
  visibility: hidden;
  background-color: white;
  position: absolute;
  z-index: 103;
`;

const Item = styled.div`
  border: 3px solid darkgrey;
  box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.2);
  border-radius: 2px;
  padding: 8px;
  margin: 8px;
  font-size: 11px;
  z-index: 101;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDragging ? 'darkgrey' : 'white')};
  &:hover + ${Hover} {
    visibility: visible;
    width: 58px;
    height: 38px;
    margin-left: -18rem;
  }
`;


const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;


const List = (props) => {
  const items = props.list;
  const id = props.droppableId;

  return (
    <Droppable droppableId={id} isDropDisabled={true}>
        {(provided, snapshot) => (
            <Kiosk
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}>
                {items.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <React.Fragment>
                                <Item
                                    title={item.name}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    isDragging={snapshot.isDragging}
                                    style={provided.draggableProps.style}>
                                    {item.content}
                                </Item>
                                {snapshot.isDragging && (
                                    <Clone><h6>{item.content}</h6></Clone>
                                )}
                                <Hover><Card item={item}></Card></Hover>
                            </React.Fragment>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </Kiosk>
        )}
    </Droppable>
  );
}

export default List;
