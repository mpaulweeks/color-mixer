import { Color } from './color.js';

const svg = document.getElementById('svg');

const addPolygon = () => {
  // <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
}

const draw = (s) => {
  s.combined.elm.style.background = s.combined.color.toHex();
}

export const canvas = {
  draw,
}
