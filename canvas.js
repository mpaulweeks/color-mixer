import { Color } from './color.js';
import { state } from './state.js';

const canvasElm = document.getElementById('canvas');
const ctx = canvasElm.getContext('2d');

const calibrate = () => {
  let height = document.body.clientHeight;
  let width = document.body.clientWidth;
  if (height !== canvasElm.height || width !== canvasElm.width) {
    canvasElm.height = height;
    canvasElm.width = width;
  }
  state.combined.origin = {x: width/2, y: height};
  state.combined.radius = width/6;
  state.lights.forEach((l, i) => {
    l.origin = {
      x: (width/6) * (1 + (i*2)),
      y: height/6,
    };
    l.radius = height/18;
    l.calibrateButtons();
  });
}

const draw = () => {
  const s = state; // shorthand

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasElm.width, canvasElm.height);

  // draw light rays
  s.lights.forEach(light => {
    ctx.fillStyle = light.color.toHex();
    ctx.beginPath();
    ctx.moveTo(light.origin.x, light.origin.y);
    ctx.lineTo(s.combined.origin.x - s.combined.radius, s.combined.origin.y);
    ctx.lineTo(s.combined.origin.x + s.combined.radius, s.combined.origin.y);
    ctx.closePath();
    ctx.fill();
  });

  // draw light rings / labels
  ctx.lineWidth = 5;
  s.lights.forEach(light => {
    ctx.strokeStyle = light === s.hover ? 'white' : light.color.toHexOriginal();
    ctx.beginPath();
    ctx.arc(light.origin.x, light.origin.y, light.radius, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.stroke();
  });

  // draw light buttons
  s.buttons.forEach(button => {
    ctx.strokeStyle = button.selected ? 'black' : 'white';
    ctx.fillStyle = button.selected ? 'white' : 'black';
    ctx.beginPath();
    ctx.arc(button.origin.x, button.origin.y, button.radius, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(button.label, button.origin.x, button.origin.y);
  });

  // draw combined
  ctx.fillStyle = s.combined.color.toHex();
  ctx.beginPath();
  ctx.arc(s.combined.origin.x, s.combined.origin.y, s.combined.radius, 0, 2*Math.PI, false);
  ctx.closePath();
  ctx.fill();
}

export const canvas = {
  calibrate,
  draw,
}
