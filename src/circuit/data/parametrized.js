import uuid from 'uuid/v4';

const PARAMETRIZED = [
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Z Gate",
    content: "Z^(A/2^n)",
    explanation: "Rotates the target by input A / 2^n'th of a half turn around the Z axis. N is the number of qubits in input A."
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Z Gate",
    content: "Z^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the Z axis. N is the number of qubits in input A."
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Y Gate",
    content: "Y^(A/2^n)",
    explanation: "Rotates the target by input A/2^n'th of a half turn around the Y axis. N is the number of qubits in input A."
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Y Gate",
    content: "Y^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the Y axis. N is the number of qubits in input A."
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized X Gate",
    content: "X^(A/2^n)",
    explanation: "Rotates the target by input A/2^n'th of a half turn around the X axis. N is the number of qubits in input A."
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -X Gate",
    content: "X^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the X axis. N is the number of qubits in input A."

  },
];

export default PARAMETRIZED;
