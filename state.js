import { Light } from './light.js';

const lights = ['#FF0000', '#00FF00', '#0000FF'].map(hex => new Light(hex));
const buttons = lights.reduce((arr, l) => {
  l.buttons.forEach(b => {
    arr.push(b);
  });
  return arr;
}, []);
export const state = {
  lights: lights,
  buttons: buttons,
  combined: new Light('#000000'),
  selected: undefined,
  hover: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
};
