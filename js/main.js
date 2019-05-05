import { Color } from './color.js';
import { state } from './state.js';
import { canvas } from './canvas.js';

const checkMatch = () => {
  if (state.goal.matches(state.combined.color)){
    goalPercent.complete = true;
    state.success = true;
    setTimeout(() => {
      state.success = false;
      state.goal.randomize(state.combined.color);
      render();
    }, 1000);
  }
}

const render = () => {
  const otherColors = state.lights.map(l => l.color);
  state.combined.color = Color.combine(otherColors);
  checkMatch();
  canvas.draw(state);
}
window.addEventListener('resize', render);

let goalPercent = {
  complete: true,
  light: null,
  percent: null,
};

state.lights.forEach(l => {
  l.sourceElm.addEventListener('mousedown', e => {
    const rect = l.sourceElm.getBoundingClientRect();
    const percent = 1 - ((e.clientY - rect.top) / rect.height);
    goalPercent = {
      complete: false,
      light: l,
      percent: percent,
    };
  });
});

// on page load
state.lights.forEach(light => canvas.addPolygon(light));
state.goal.randomize(state.combined.color);
render();

setInterval(() => {
  if (!goalPercent.complete) {
    goalPercent.complete = goalPercent.light.color.progressTowards(goalPercent.percent);
    render();
  }
}, 1);
