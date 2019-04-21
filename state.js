import { Light, Combined } from './light.js';

const container = document.getElementById('container');
container.innerHTML = `
  <div class="row">
    ${['r','g','b'].map(c => `
      <div id="${c}">
        <div class="row">
          <div class="button"></div>
          <div class="button"></div>
        </div>
        <div class="row center">
          <div class="source"></div>
        </div>
      </div>
    `).join('\n')}
  </div>
  <div class="row center">
    <div id="combined"></div>
  </div>
`;

const lights = [
  {
    hex: '#FF0000',
    id: 'r',
  },
  {
    hex: '#00FF00',
    id: 'g',
  },
  {
    hex: '#0000FF',
    id: 'b',
  },
].map(data => new Light(data));
const buttons = lights.reduce((arr, l) => {
  l.buttons.forEach(b => {
    arr.push(b);
  });
  return arr;
}, []);
export const state = {
  lights: lights,
  buttons: buttons,
  combined: new Combined({
    id: 'combined',
  }),
  selected: undefined,
  hover: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
};
