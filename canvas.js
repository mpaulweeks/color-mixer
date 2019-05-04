import { Color } from './color.js';

const svg = document.getElementById('svg');

const addPolygon = light => {
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  document.getElementById('svg').appendChild(polygon);
  light.polygonElm = polygon;
}
const updatePolygon = (light, index) => {
  const containerRect = document.getElementById('container').getBoundingClientRect();
  const sourceRect = light.sourceElm.getBoundingClientRect();
  const pipeWidth = containerRect.width / 8;
  const pipeMargin = 4;
  const pipeRight = containerRect.right - (index * pipeWidth);
  const pipeLeft = pipeRight - pipeWidth;
  const points = [
    [sourceRect.right - pipeMargin, sourceRect.top + pipeMargin],
    [pipeRight - pipeMargin, sourceRect.top + pipeMargin],
    [pipeRight - pipeMargin, containerRect.bottom - pipeMargin],
    [pipeLeft + pipeMargin, containerRect.bottom - pipeMargin],
    [pipeLeft + pipeMargin, sourceRect.bottom - pipeMargin],
    [sourceRect.right - pipeMargin, sourceRect.bottom - pipeMargin],
  ].map(p => `${p[0]},${p[1]}`).join(' ');
  light.polygonElm.setAttribute('points', points);
  light.polygonElm.setAttribute('fill', light.color.toHex());
}

const draw = (s) => {
  const combinedColor = s.combined.color.toHex();
  document.getElementById('combinedHex').innerText = combinedColor;
  s.combined.elm.style.background = combinedColor;
  s.lights.forEach((l, index) => {
    l.updateFill();
    updatePolygon(l, index);
  });
}

export const canvas = {
  addPolygon,
  draw,
}
