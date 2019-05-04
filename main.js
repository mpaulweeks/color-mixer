import { Color } from './color.js';
import { state } from './state.js';
import { canvas } from './canvas.js';

const render = () => {
  const otherColors = state.lights.map(l => l.color);
  state.combined.color = Color.combine(otherColors);
  canvas.draw(state);
}

let mouseDown = undefined;
window.addEventListener('mousedown', e => {
  mouseDown = setInterval(() => {
    state.hover && state.hover.callback();
    render();
  }, 1);
});
window.addEventListener('mouseup', e => {
  clearInterval(mouseDown);
  mouseDown = undefined;
});

state.buttons.forEach(b => {
  b.elm.addEventListener('mouseenter', e => {
    state.hover = b;
  });
  b.elm.addEventListener('mouseleave', e => {
    if (state.hover === b) {
      state.hover = undefined;
    }
  });
});

// on page load
state.lights.forEach(light => canvas.addPolygon(light));
render();
