import uuid from 'uuid/v4';
import H from '../../images/Half_Turns/H.png';
import Swap from '../../images/Half_Turns/Swap.png';
import X from '../../images/Half_Turns/X.png';
import Y from '../../images/Half_Turns/Y.png';
import Z from '../../images/Half_Turns/Z.png';

const HALF_TURNS = [
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Z Gate",
      content: "Z",
      explanation: "The phase flip gate. Negates phases when the qubit is ON.",
      image: Z
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Swap Gate (Half)",
      content: "Swap",
      explanation: "Swaps the values of two qubits (Place two in the same column).",
      image: Swap
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli Y Gate",
      content: "Y",
      explanation: "A combination of the X and Z gates.",
      image: Y
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Pauli X Gate",
      content: "X",
      explanation: "The NOT gate. Toggles between ON and OFF.",
      image: X
    },
    {
      id: uuid(),
      group: "half_turns",
      name: "Hadamard Gate",
      content: "H",
      explanation: "Creates simple superpositions. Maps ON to ON + OFF. Maps OFF to ON - OFF",
      image: H
    },
  ];

  export default HALF_TURNS;
