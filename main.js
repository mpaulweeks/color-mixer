import { Color } from './color.js';
import { state } from './state.js';
import { canvas } from './canvas.js';

const render = () => {
  const otherColors = state.lights.map(l => l.color);
  state.combined.color = Color.combine(otherColors);
  canvas.draw();
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

window.addEventListener('mousemove', e => {
  const newPoint = {
    x: e.clientX,
    y: e.clientY,
  };
  state.buttons.forEach(b => {
    b.selected = b.contains(newPoint);
  });
  state.mouse = {...newPoint};
  state.hover = state.buttons.filter(b => b.selected)[0];
  render();
});

const toggleHeader = () => {
  document.getElementById('header').classList.toggle('hidden');
};
document.getElementById('header-close').addEventListener('click', () => {
  toggleHeader();
});

// on page load
canvas.calibrate();
render();
