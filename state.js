import { Light } from './model.js';

export const state = {
  lights: [
    {
      origin: {x: 100, y: 300},
      color: '#FF0000',
    },
    {
      origin: {x: 200, y: 300},
      color: '#00FF00',
    },
    {
      origin: {x: 300, y: 300},
      color: '#0000FF',
    },
    {
      isCombined: true,
      origin: {x: 400, y: 300},
      color: '#000000',
    },
  ].map(data => new Light({
    ...data,
    angle: Math.PI * 0.5,
    window: Math.PI / 6,
    depth: document.body.clientWidth/2,
    color: data.color,
  })),
  selected: undefined,
  hover: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
  clone: () => {
    if (state.selected){
      state.lights.push(state.selected.clone());
    }
  },
  delete: () => {
    if (state.selected){
      const index = state.lights.indexOf(state.selected);
      state.lights.splice(index, 1);
      if (state.hover === state.selected){
        state.hover = undefined;
      }
      state.selected = undefined;
    }
  }
};
