import uuid from 'uuid/v4';
import X_quarter from '../../images/Eighth_Turns/X_1-4.png';
import X_negativequarter from '../../images/Eighth_Turns/X_-1-4.png';
import Y_quarter from '../../images/Eighth_Turns/Y_1-4.png';
import Y_negativequarter from '../../images/Eighth_Turns/Y_-1-4.png';


const EIGHTH_TURNS = [
  {
    id: uuid(),
    group: "eighth_turns",
    name: "Z^¼ Gate",
    content: "Z^¼",
    explanation: "Principle fourth root of Z."
  },
  {
    id: uuid(),
    group: "eighth_turns",
    name: "Z^-¼ Gate",
    content: "Z^-¼",
    explanation: "Adjoint fourth root of Z."
  },
  {
    id: uuid(),
    group: "eighth_turns",
    name: "Y^¼ Gate",
    content: "Y^¼",
    explanation: "Principle fourth root of Y.",
    image: Y_quarter
  },
  {
    id: uuid(),
    group: "eighth_turns",
    name: "Y^-¼ Gate",
    content: "Y^-¼",
    explanation: "Adjoint fourth root of Y.",
    image: Y_negativequarter
  },
  {
    id: uuid(),
    group: "eighth_turns",
    name: "X^¼ Gate",
    content: "X^¼",
    explanation: "Principle fourth root of X.",
    image: X_quarter
  },
  {
    id: uuid(),
    group: "eighth_turns",
    name: "X^-¼ Gate",
    content: "X^-¼",
    explanation: "Adjoint fourth root of X.",
    image: X_negativequarter
  },
];

export default EIGHTH_TURNS;
