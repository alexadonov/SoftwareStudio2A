import uuid from 'uuid/v4';

const DISPLAYS = [

    {
        id: uuid(),
        group: 'displays',
        name: "Density Matrix Display",
        content: "Density",
        explanation: "Shows the density matrix of the local mixed state of some wires. Use controls to see conditional states."
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Bloch Sphere Display",
        content: "Bloch",
        explanation: "Shows a wire's local state as a point on the Bloch Sphere. Use controls to see conditional states."
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Probability Display",
        content: "Chance",
        explanation: "Shows chances of outcomes if a measurement was performed. Use controls to see conditional probabilities."
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Amplitude Display",
        content: "Amps2",
        explanation: "Shows the amplitudes of some wires, if separable. Use controls to see conditional amplitudes."
    },

];

export default DISPLAYS;
