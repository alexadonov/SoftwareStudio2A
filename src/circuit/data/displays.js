import uuid from 'uuid/v4';
import Amps from '../images/Displays/Amps.png';
import Bloch from '../images/Displays/Bloch.png';
import Chance from '../images/Displays/Chance.png';
import Density from '../images/Displays/Density.png';

const DISPLAYS = [

    {
        id: uuid(),
        group: 'displays',
        name: "Density Matrix Display",
        content: "Density",
        explanation: "Shows the density matrix of the local mixed state of some wires. Use controls to see conditional states.",
        image: Density
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Bloch Sphere Display",
        content: "Bloch",
        explanation: "Shows a wire's local state as a point on the Bloch Sphere. Use controls to see conditional states.",
        image: Bloch
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Probability Display",
        content: "Chance",
        explanation: "Shows chances of outcomes if a measurement was performed. Use controls to see conditional probabilities.",
        image: Chance
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Amplitude Display",
        content: "Amps2",
        explanation: "Shows the amplitudes of some wires, if separable. Use controls to see conditional amplitudes.",
        image: Amps
    },

];

export default DISPLAYS;
