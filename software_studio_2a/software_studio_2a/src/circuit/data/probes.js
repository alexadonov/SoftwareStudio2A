import uuid from 'uuid/v4';

const ITEMS = [
    {
      id: uuid(),
      group: "probes",
      name: "Measurement Gate",
      content: "Measure",
      explanation: "Measures whether a qubit is ON or OFF, without conditioning on the result."
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect Off",
      content: "|0⟩⟨0|",
      explanation: "Keeps OFF states, discars/retries ON states."
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect On",
      content: "|1⟩⟨1|",
      explanation: "Keeps ON states, discards/retries OFF states."
    },
    {
      id: uuid(),
      group: "probes",
      name: "Anti-Control",
      content: "⚪",
      explanation: "Conditions on a qubit being OFF. Gates in the same column only apply to states meeting the condition."
    },
    {
      id: uuid(),
      group: "probes",
      name: "Control",
      content: "⚫",
      explanation: "Conditions on a qubit being ON. Gates in the same column only apply to states meeting the condition."
    },

];

export default ITEMS;
