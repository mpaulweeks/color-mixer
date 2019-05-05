import { Light, Combined, Goal } from './light.js';

document.getElementById('colors').innerHTML += ['r','g','b'].map(c => `
  <div id="${c}" class="row">
    <div class="label"></div>
    <div class="source">
      <div class="sourceFill"></div>
    </div>
  </div>
`).join('\n');

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
export const state = {
  lights: lights,
  combined: new Combined({
    id: 'combined',
  }),
  goal: new Goal({
    id: 'goal',
  }),
};
