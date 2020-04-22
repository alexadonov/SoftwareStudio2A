import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card  = (props) => {
  const item = props.item;
    return (
        <div class="card" style={{width: '18rem'}}>
        <div class="card-body">
          <h5 class="card-title"><b>{item.name}</b></h5>
          <h6 class="card-subtitle mb-2 text-muted">{item.content}</h6>
          <p class="card-text">{item.explanation}</p>
          <img src={item.image}></img>
        </div>
      </div>
    );
  }

  export default Card;
