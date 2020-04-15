import uuid from 'uuid/v4';

const HALF_TURNS = [
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Z Gate",
      content: "Z"
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Swap Gate (Half)",
      content: "Swap"
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Y Gate",
      content: "Y"
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli X Gate",
      content: "X"
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Hadamard Gate",
      content: "H"
    },
  ];

  export default HALF_TURNS;
