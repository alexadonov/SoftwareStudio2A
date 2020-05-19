import uuid from 'uuid/v4';
import XD from '../../images/Sampling/XD.png';
import XDCR from '../../images/Sampling/XDCR.png';
import YD from '../../images/Sampling/YD.png';
import YDCR from '../../images/Sampling/YDCR.png';
import ZD from '../../images/Sampling/ZD.png';
import ZDCR from '../../images/Sampling/ZDCR.png';

const SAMPLING = [
  {
    id: uuid(),
    group: "sampling",
    name: "Z Axis Detector",
    content: "ZD",
    explanation: "Sampled Z-axis measurement. Show *click* when the target qubit is |1> and controls are satisifed.",
    image: ZD
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Z Detect-Control-Reset",
    content: "ZDCR",
    explanation: "Does a sampled Z-axis measurement. Controls operations with the result. Resets the target to |0>.",
    image: ZDCR
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Axis Detector",
    content: "YD",
    explanation: "Sampled Y-axis measurement. Shows *click* when the target qubit is |0>i|1> and controls are satisfied.",
    image: YD
  },
  {
    id: uuid(),
    group: "sampling",
    name: "Y Detect-Control-Reset",
    content: "YDCR",
    explanation: "Does a sampled Y-axis measurement. Controls operations with the result. Resets the target to |0>.",
    image: YDCR
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Axis Detector",
    content: "XD",
    explanation: "Sampled X-axis measurement. Shows *click* when the target qubit is |0>-|1> and controls are satisfied.",
    image: XD
  },
  {
    id: uuid(),
    group: "sampling",
    name: "X Detect-Control-Reset",
    content: "XDCR",
    explanation: "Does a sampled X-axis measurement. Controls operations with the result. Resets the target to |0>.",
    image: XDCR
  },

];

export default SAMPLING;
