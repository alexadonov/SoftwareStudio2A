import uuid from 'uuid/v4';
import Measure from '../../images/Probes/Measure.png';
import AntiControl from '../../images/Probes/Anti-Control.png';
import Control from '../../images/Probes/Control.png';
import PostselectOff from '../../images/Probes/Postselect_Off.png';
import PostselectOn from '../../images/Probes/Postselect_On.png';

const ITEMS = [
    {
      id: uuid(),
      group: "probes",
      name: "Measurement Gate",
      content: "Measure",
      explanation: "Measures whether a qubit is ON or OFF, without conditioning on the result.",
      image: Measure
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect Off",
      content: "|0⟩⟨0|",
      explanation: "Keeps OFF states, discars/retries ON states.",
      image: PostselectOff
    },
    {
      id: uuid(),
      group: "probes",
      name: "PostSelect On",
      content: "|1⟩⟨1|",
      explanation: "Keeps ON states, discards/retries OFF states.",
      image: PostselectOn
    },
    {
      id: uuid(),
      group: "probes",
      name: "Anti-Control",
      content: "⚪",
      explanation: "Conditions on a qubit being OFF. Gates in the same column only apply to states meeting the condition.",
      image: AntiControl
    },
    {
      id: uuid(),
      group: "probes",
      name: "Control",
      content: "⚫",
      explanation: "Conditions on a qubit being ON. Gates in the same column only apply to states meeting the condition.",
      image: Control
    },

];

export default ITEMS;
