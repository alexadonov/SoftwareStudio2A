import uuid from 'uuid/v4';

const SAMPLING = [
  {
    id: uuid(),
    group: "sampling",
    name: "Z Axis Detector",
    content: "ZD"
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Z Detect-Control-Reset",
    content: "ZDCR"
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Axis Detector",
    content: "YD"
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Detect-Control-Reset",
    content: "YDCR"
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Axis Detector",
    content: "XD"
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Detect-Control-Reset",
    content: "XDCR"
  },

];

export default SAMPLING;
