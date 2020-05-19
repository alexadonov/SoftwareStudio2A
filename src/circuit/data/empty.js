import uuid from 'uuid/v4';
import empty from '../../images/Empty/Empty.png';

const EMPTY = [
  {
    id: uuid(),
    group: "empty",
    name: "Empty",
    content: "1",
    explanation: "This is an empty block used to seperate columms.",
    image: empty
  },
];

export default EMPTY;
