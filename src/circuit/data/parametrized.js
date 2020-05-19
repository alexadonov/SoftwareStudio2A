import uuid from 'uuid/v4';
import Neg_X_Gate from '../../images/Parameterized/-X-Gate.png';
import X_Gate from '../../images/Parameterized/X-Gate.png';
import Neg_Y_Gate from '../../images/Parameterized/-Y-Gate.png';
import Y_Gate from '../../images/Parameterized/Y-Gate.png';
import Neg_Z_Gate from '../../images/Parameterized/-Z-Gate.png';
import Z_Gate from '../../images/Parameterized/Z-Gate.png';

const PARAMETRIZED = [
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Z Gate",
    content: "Z^(A/2^n)",
    explanation: "Rotates the target by input A / 2^n'th of a half turn around the Z axis. N is the number of qubits in input A.",
    image: Z_Gate
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Z Gate",
    content: "Z^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the Z axis. N is the number of qubits in input A.",
    image: Neg_Z_Gate
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Y Gate",
    content: "Y^(A/2^n)",
    explanation: "Rotates the target by input A/2^n'th of a half turn around the Y axis. N is the number of qubits in input A.",
    image: Y_Gate
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Y Gate",
    content: "Y^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the Y axis. N is the number of qubits in input A.",
    image: Neg_Y_Gate
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized X Gate",
    content: "X^(A/2^n)",
    explanation: "Rotates the target by input A/2^n'th of a half turn around the X axis. N is the number of qubits in input A.",
    image: X_Gate
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -X Gate",
    content: "X^(-A/2^n)",
    explanation: "Counter-rotates the target by input A/2^n'th of a half turn around the X axis. N is the number of qubits in input A.",
    image: Neg_X_Gate

  },
];

export default PARAMETRIZED;
