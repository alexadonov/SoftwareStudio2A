import uuid from 'uuid/v4';

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

import {retrieveCircuits} from '../circuit/apicaller.js';

export const getId =(droppableDestination, lineArray) => {
  var id;
  for(var i=0; i < lineArray.length; i++) {
    if(droppableDestination.droppableId === lineArray[i][1]) {
      id = lineArray[i][0];
    }
  }
  return id;
};


// The next 3 functions allow the items to be moved
// If moving from the toolbox to the algorithm maker,
// You need to make a copy, hence copy() is called
// Reorder only works for the algorithm maker

// a little function to help us with reordering the result

export const reorder = (list, startIndex, endIndex, droppableDestination, algorithm, lineArray) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    var destination_id = getId(droppableDestination, lineArray);
    algorithm[destination_id].splice(endIndex, 0, algorithm[destination_id].splice(startIndex, 1));
    localStorage.setItem("algorithm", JSON.stringify(algorithm));
    return result;
};

/**
 * Moves an item from one list to another list.
 */
export const copy = (source, destination, droppableSource, droppableDestination, algorithm, lineArray) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];


    var destination_id = getId(droppableDestination, lineArray);
    //console.log(destination_id)
    algorithm[destination_id].splice(droppableDestination.index, 0, item);
    localStorage.setItem("algorithm", JSON.stringify(algorithm));

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

    return destClone;
};

export const remove = (source, droppableSource, algorithm, lineArray) => {
    const sourceClone = Array.from(source);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    sourceClone.splice(removed, 0);

    var source_id = getId(droppableSource, lineArray);
    algorithm[source_id].splice(droppableSource.index, 1);
    localStorage.setItem('algorithm', JSON.stringify(algorithm));

    const result = {};
    result[droppableSource.droppableId] = sourceClone;

    return result;
};

export const move = (source, destination, droppableSource, droppableDestination, algorithm, lineArray) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    var source_id = getId(droppableSource, lineArray);
    algorithm[source_id].splice(droppableSource.index, 1);

    var destination_id = getId(droppableDestination, lineArray);
    algorithm[destination_id].splice(droppableDestination.index, 0, removed);

    // copy(source, destination, droppableSource, droppableDestination);
    // remove(source, droppableSource);

    localStorage.setItem('algorithm', JSON.stringify(algorithm));

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export const getLargestRow = (algorithm) => {
  var currentMax = 0;
  for(var i = 0; i < algorithm.length; i++) {
    if(algorithm[i].length > currentMax) {
      currentMax = algorithm[i].length;
    }
  }
  return currentMax;
}

export const removeUndefined = (algorithm) => {
  for(var a = 0; a < getLargestRow(algorithm); a++) {
    for(var i = 0; i < algorithm.length; i++) {
        if(algorithm[i][a] === undefined) {
          algorithm[i][a] = "1";
        }
    }
  }
}

export const getCircuitInput = (algorithm) => {
  removeUndefined(algorithm);
  var circuit_input = new Array();
  var column = new Array();
  var k = 0;
  var p = 0;
  for(var a = 0; a < getLargestRow(algorithm); a++) {
    for(var i = 0; i < algorithm.length; i++) {
        column[k] = algorithm[i][p].content;
        k++;
    }
    circuit_input[a] = column;
    p++;
    column = [];
    k=0;
  }
  removeUndefined(circuit_input);
  //console.log(circuit_input);
  return circuit_input;
}

// Gets student id and returns it (if it doesn't exist, returns NaN)
export const getStudentID = () => {
  return parseInt(localStorage.getItem('student_id'));
}

export const getAlgorithmName = () => {
  return localStorage.getItem('algorithm_name');
}

export const setAlgorithmName = (algorithm_name) => {
  localStorage.setItem('algorithm_name', algorithm_name);
}

const algorithmExists = async (student_id, algorithm_name) => {
  const results = await retrieveCircuits({
    'student_id': student_id,
    'circuit_name': algorithm_name
  });
  return (Object.keys(results['circuits']).length)
};

// Checks if a algorithm has a valid name (checking string and to see if there is a preexisting one)
export const isValidAlgorithmName = async (algorithm_name) => {
  if (algorithm_name === null) return false;
  if (algorithm_name === "null" || algorithm_name.length === 0) {
    alert("Please enter a valid name.");
  } else {
    const student_id = getStudentID();
    if (student_id) {
      const exists = await algorithmExists(student_id, algorithm_name);
      if (!exists) {
        return true;
      } else {
        alert("An algorithm with this name already exists!")
      }
    }
  }
  return false;
}

export const resetTempStorage = (clear_all=false) => {
  if (clear_all) {
    localStorage.clear();
    sessionStorage.clear();
  } else {
    sessionStorage.setItem("currentversion", 0);
    sessionStorage.setItem("finalversion", 0);
    localStorage.setItem('algorithm', null);
    localStorage.setItem('algorithm_name', null);
    //localStorage.setItem("saved", false);
  }
}

export const verifyCircuit = (algorithm) => {
  //Loop through the array to check all conditions are met
  //Maybe make a new file for this
  //e.g. there has to be 2 gates

  //"SWAP" needs 2 in the same column
  let msg = "valid"
  var circuit_input = getCircuitInput(algorithm);
  if(circuit_input.length === 0) {
    msg = "The circuit is empty!";
  } else {
    var count = 0;
    for(var i = 0; i < circuit_input.length; i++) {
      for(var j = 0; j < circuit_input[i].length; j++) {
        if(String(circuit_input[i][j]).toLowerCase() === "swap") count++;
      }
      if(count === 1) {
        msg = "You need 2 Swaps in a column";
      } else if (count > 2) {
        msg = "Only a single pair of Swaps is allowed in column";
      }
      count = 0;
    }
  }
  return msg;
}

export const escapeSpecialCharacters = (JSONfile) => {
  var JSONstring = JSON.stringify(JSONfile);
  var escapedJSONstring = JSONstring.replace(/[\\]/g, '\\\\')
  .replace(/["]/g, '\"');
  /*
  .replace(/[\/]/g, '\\/')
  .replace(/[\b]/g, '\\b')
  .replace(/[\f]/g, '\\f')
  .replace(/[\n]/g, '\\n')
  .replace(/[\r]/g, '\\r')
  .replace(/[\t]/g, '\\t');
  */
  return escapedJSONstring;
}

export const findCopyItems = (id) => {
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

export const findCopyItemsId = (id) => {
  switch(id) {
    case "DISPLAYS": { return "DISPLAYS"; }
    case "PROBES": { return "PROBES"; }
    case "HALF_TURNS": { return "HALF_TURNS"; }
    case "QUARTER_TURNS": { return "QUARTER_TURNS"; }
    case "EIGHTH_TURNS": { return "EIGHTH_TURNS"; }
    case "PARAMETRIZED": { return "PARAMETRIZED"; }
    case "SAMPLING": { return "SAMPLING"; }
    case "PARITY": { return "PARITY"; }
    case "EMPTY": { return "EMPTY"; }
    default: return;
  }
}

export const getObject = (name) => {
  if(name === '1') {
    return "1";
  }
  for(var i = 0; i < DISPLAYS.length; i++) {
    if(DISPLAYS[i].content === name) {
      return DISPLAYS[i];
    }
  }

  for(var i = 0; i < QUARTER_TURNS.length; i++) {
    if(QUARTER_TURNS[i].content === name) {
      return QUARTER_TURNS[i];
    }
  }

  for(var i = 0; i < EIGHTH_TURNS.length; i++) {
    if(EIGHTH_TURNS[i].content === name) {
      return EIGHTH_TURNS[i];
    }
  }

  for(var i = 0; i < HALF_TURNS.length; i++) {
    if(HALF_TURNS[i].content === name) {
      return HALF_TURNS[i];
    }
  }

  for(var i = 0; i < PARAMETRIZED.length; i++) {
    if(PARAMETRIZED[i].content === name) {
      return PARAMETRIZED[i];
    }
  }

  for(var i = 0; i < PARITY.length; i++) {
    if(PARITY[i].content === name) {
      return PARITY[i];
    }
  }

  for(var i = 0; i < PROBES.length; i++) {
    if(PROBES[i].content === name) {
      return PROBES[i];
    }
  }

  for(var i = 0; i < SAMPLING.length; i++) {
    if(SAMPLING[i].content === name) {
      return SAMPLING[i];
    }
  }

}

 const removeOnes = (algorithm) => {
  for(var i = 0; i < algorithm.length; i++) {
    for(var j = 0; j < algorithm[i].length; j++) {
      if(algorithm[i][j] === "1") {
        algorithm[i].splice(j,1);
        return;
      }
    }
  }
}

export const fixAlgorithm = () => {
  let algorithm = JSON.parse(localStorage.getItem('algorithm'));
  for(var i = 0; i < algorithm.length; i++) {
    for(var j = 0; j < algorithm[i].length; j++) {
      algorithm[i][j] = getObject(algorithm[i][j]);
      removeOnes(algorithm);
    }
  }
  localStorage.setItem('algorithm', JSON.stringify(algorithm));
}
