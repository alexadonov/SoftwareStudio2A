import uuid from 'uuid/v4';

const SAMPLING = [
  {
    id: uuid(),
    group: "sampling",
    name: "Z Axis Detector",
    content: "ZD",
    explanation: "Sampled Z-axis measurement. Show *click* when the target qubit is |1> and controls are satisifed."
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Z Detect-Control-Reset",
    content: "ZDCR",
    explanation: "Does a sampled Z-axis measurement. Controls operations with the result. Resets the target to |0>."
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Axis Detector",
    content: "YD",
    explanation: "Sampled Y-axis measurement. Shows *click* when the target qubit is |0>i|1> and controls are satisfied."
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Detect-Control-Reset",
    content: "YDCR",
    explanation: "Does a sampled Y-axis measurement. Controls operations with the result. Resets the target to |0>."
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Axis Detector",
    content: "XD",
    explanation: "Sampled X-axis measurement. Shows *click* when the target qubit is |0>-|1> and controls are satisfied."
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Detect-Control-Reset",
    content: "XDCR",
    explanation: "Does a sampled X-axis measurement. Controls operations with the result. Resets the target to |0>."
  },

];

export default SAMPLING;
