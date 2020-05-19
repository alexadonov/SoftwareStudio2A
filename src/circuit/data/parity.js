import uuid from 'uuid/v4';
import Xpar from '../../images/Parity/X_par.png';
import Ypar from '../../images/Parity/Y_par.png';
import Zpar from '../../images/Parity/Z_par.png';

const PARITY = [
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (Z)",
    content: "zpar",
    explanation: "Includes a qubit's Z observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied.",
    image: Zpar
  },
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (Y)",
    content: "ypar",
    explanation: "Includes a qubit's Y observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied.",
    image: Ypar
  },
  {
    id: uuid(),
    group: "PARITY",
    name: "Parity Contorl (X)",
    content: "xpar",
    explanation: "Includes a qubit's X observable in the column parity control. Gates in the same column only apply if an odd number of parity controls are satisfied.",
    image: Xpar
  },
];

export default PARITY;
