import uuid from 'uuid/v4';
import NegY_Gate from '../../images/Quarter_Turns/Y_-1-2.png';
import Y_Gate from '../../images/Quarter_Turns/Y_1-2.png';
import NegX_Gate from '../../images/Quarter_Turns/X_-1-2.png';
import X_Gate from '../../images/Quarter_Turns/X_1-2.png';
import NegZ_Gate from '../../images/Quarter_Turns/Z_-1-2.png';
import Z_Gate from '../../images/Quarter_Turns/Z_1-2.png';

const QUARTER_TURNS = [
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Z) Gate",
      content: "Z^½",
      explanation: "Principle square root of Z. Also known as the 'S' gate.",
      image: Z_Gate
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Z^-½ Gate",
      content: "Z^-½",
      explanation: "Adjoint square root of Z.",
      image: NegZ_Gate
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Y) Gate",
      content: "Y^½",
      explanation: "Principle sqaure root of Y.",
      image: Y_Gate
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Y^-½ Gate",
      content: "Y^-½",
      explanation: "Adjoint square root of Y.",
      image: NegY_Gate
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(X) Gate",
      content: "X^½",
      explanation: "Principle square root of NOT.",
      image: X_Gate
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "X^-½ Gate",
      content: "X^-½",
      explanation: "Adjoint square root of NOT.",
      image: NegX_Gate
    },

  ];

export default QUARTER_TURNS;
