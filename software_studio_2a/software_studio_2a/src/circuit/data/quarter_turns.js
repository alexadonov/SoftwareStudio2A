import uuid from 'uuid/v4';

const QUARTER_TURNS = [
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Z) Gate",
      content: "Z^½"
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Z^-½ Gate",
      content: "Z^-½"
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(Y) Gate",
      content: "Y^½"
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Y^-½ Gate",
      content: "Y^-½"
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "Sqrt(X) Gate",
      content: "X^½"
    },
    {
      id: uuid(),
      group: "quarter_turns",
      name: "X^-½ Gate",
      content: "X^-½"
    },

  ];

export default QUARTER_TURNS;
