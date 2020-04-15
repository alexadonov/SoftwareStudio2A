import uuid from 'uuid/v4';

const PARAMETRIZED = [
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Z Gate",
    content: "Z^(A/2^n)"
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Z Gate",
    content: "Z^(-A/2^n)"
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized Y Gate",
    content: "Y^(A/2^n)"
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -Y Gate",
    content: "Y^(-A/2^n)"
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized X Gate",
    content: "X^(A/2^n)"
  },
  {
    id: uuid(),
    group: "parametrized",
    name: "Parameterized -X Gate",
    content: "X^(-A/2^n)"
  },
];

export default PARAMETRIZED;
