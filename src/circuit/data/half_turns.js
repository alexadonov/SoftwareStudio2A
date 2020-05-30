import uuid from 'uuid/v4';

const HALF_TURNS = [
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Z Gate",
      content: "Z",
      explanation: "The phase flip gate. Negates phases when the qubit is ON."
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Y Gate",
      content: "Y",
      explanation: "A combination of the X and Z gates."
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli X Gate",
      content: "X",
      explanation: "The NOT gate. Toggles between ON and OFF."
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Hadamard Gate",
      content: "H",
      explanation: "Creates simple superpositions. Maps ON to ON + OFF. Maps OFF to ON - OFF"
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Swap Gate (Half)",
      content: "Swap",
      explanation: "Swaps the values of two qubits (Place two in the same column)."
    }
  ];

  export default HALF_TURNS;
