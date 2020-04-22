import uuid from 'uuid/v4';

const PARITY = [
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (Z)",
    content: "zpar",
    explanation: "Includes a qubit's Z observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied.",
  },
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (Y)",
    content: "ypar",
    explanation: "Includes a qubit's Y observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied."
  },
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (X)",
    content: "xpar",
    explanation: "Includes a qubit's X observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied."
  },
];

export default PARITY;
