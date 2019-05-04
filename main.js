import { Color } from './color.js';
import { state } from './state.js';
import { canvas } from './canvas.js';

const render = () => {
  const otherColors = state.lights.map(l => l.color);
  state.combined.color = Color.combine(otherColors);
  canvas.draw(state);
}
window.addEventListener('resize', render);

let goal = {
  complete: true,
  light: null,
  percent: null,
};

state.lights.forEach(l => {
  l.sourceElm.addEventListener('mousedown', e => {
    const rect = l.sourceElm.getBoundingClientRect();
    const percent = 1 - ((e.clientY - rect.top) / rect.height);
    goal = {
      complete: false,
      light: l,
      percent: percent,
    };
  });
});

// on page load
state.lights.forEach(light => canvas.addPolygon(light));
render();

setInterval(() => {
  if (!goal.complete) {
    goal.complete = goal.light.color.progressTowards(goal.percent);
    render();
  }
}, 1);
