import uuid from 'uuid/v4';

const DISPLAYS = [

    {
        id: uuid(),
        group: 'displays',
        name: "Density Matrix Display",
        content: "Density"
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Bloch Sphere Display",
        content: "Bloch"
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Probability Display",
        content: "Chance"
    },
    {
        id: uuid(),
        group: 'displays',
        name: "Amplitude Display",
        content: "Amps2"
    },

];

export default DISPLAYS;
