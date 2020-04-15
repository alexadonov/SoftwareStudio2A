import uuid from 'uuid/v4';

const ITEMS = [
    {
      id: uuid(),
      group: "probes",
      name: "Measurement Gate",
      content: "Measure"
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect Off",
      content: "|0⟩⟨0|"
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect On",
      content: "|1⟩⟨1|"
    },
    {
      id: uuid(),
      group: "probes",
      name: "Anti-Control",
      content: "⚪"
    },
    {
      id: uuid(),
      group: "probes",
      name: "Control",
      content: "⚫"
    },

];

export default ITEMS;
