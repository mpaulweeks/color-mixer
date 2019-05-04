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
  const pipeWidth = (containerRect.right - sourceRect.right) / 3;
  const pipeRight = containerRect.right - (index * pipeWidth);
  const pipeLeft = pipeRight - pipeWidth;
  const points = [
    [sourceRect.right, sourceRect.top],
    [pipeRight, sourceRect.top],
    [pipeRight, containerRect.bottom],
    [pipeLeft, containerRect.bottom],
    [pipeLeft, sourceRect.bottom],
    [sourceRect.right, sourceRect.bottom],
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
