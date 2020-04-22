import uuid from 'uuid/v4';

const QUARTER_TURNS = [
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Z) Gate",
      content: "Z^½",
      explanation: "Principle square root of Z. Also known as the 'S' gate."
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Z^-½ Gate",
      content: "Z^-½",
      explanation: "Adjoint square root of Z."
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Y) Gate",
      content: "Y^½",
      explanation: "Principle sqaure root of Y."
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Y^-½ Gate",
      content: "Y^-½",
      explanation: "Adjoint square root of Y."
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(X) Gate",
      content: "X^½",
      explanation: "Principle square root of NOT."
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "X^-½ Gate",
      content: "X^-½",
      explanation: "Adjoint square root of NOT."
    },

  ];

export default QUARTER_TURNS;
