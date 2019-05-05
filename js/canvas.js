import { Color } from './color.js';

const svg = document.getElementById('svg');

const addPolygon = light => {
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  document.getElementById('svg').appendChild(polygon);
  light.polygonElm = polygon;
}
const updatePolygon = (light, index) => {
  const combinedRect = document.getElementById('combined').getBoundingClientRect();
  const sourceRect = light.sourceElm.getBoundingClientRect();
  const pipeWidth = combinedRect.width / 4;
  const pipeMargin = 4;
  const pipeRight = combinedRect.right - (index * pipeWidth);
  const pipeLeft = pipeRight - pipeWidth;
  const points = [
    [sourceRect.right - pipeMargin, sourceRect.top + pipeMargin],
    [pipeRight - pipeMargin, sourceRect.top + pipeMargin],
    [pipeRight - pipeMargin, combinedRect.bottom - pipeMargin],
    [pipeLeft + pipeMargin, combinedRect.bottom - pipeMargin],
    [pipeLeft + pipeMargin, sourceRect.bottom - pipeMargin],
    [sourceRect.right - pipeMargin, sourceRect.bottom - pipeMargin],
  ].map(p => `${p[0]},${p[1]}`).join(' ');
  light.polygonElm.setAttribute('points', points);
  light.polygonElm.setAttribute('fill', light.color.toHex());
}

const draw = (s) => {
  const goalColor = s.goal.color.toHex();
  s.goal.elm.style.background = goalColor;

  const combinedColor = s.combined.color.toHex();
  s.combined.elm.style.background = combinedColor;
  document.getElementById('message').innerText = s.success ?
    'Good job! Next color...' : `Hex: ${combinedColor}`;

  s.lights.forEach((l, index) => {
    l.updateFill();
    updatePolygon(l, index);
  });
}

export const canvas = {
  addPolygon,
  draw,
}
