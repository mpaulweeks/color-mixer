import { Light, Combined, Goal } from './light.js';

const lights = [
  {
    hex: '#FF0000',
    id: 'r',
    label: 'Red',
  },
  {
    hex: '#00FF00',
    id: 'g',
    label: 'Green',
  },
  {
    hex: '#0000FF',
    id: 'b',
    label: 'Blue',
  },
].map(data => {
  document.getElementById('colors').innerHTML += `
    <div id="${data.id}" class="padding">
      <div class="row padding left">
        <div class="label">${data.label}</div>
        <div class="percent">0%</div>
      </div>
      <div class="row left">
        <div class="source">
          <div class="sourceFill"></div>
        </div>
      </div>
    </div>
  `;
  return data;
}).map(data => new Light(data));
export const state = {
  lights: lights,
  combined: new Combined({
    id: 'combined',
  }),
  goal: new Goal({
    id: 'goal',
  }),
};
