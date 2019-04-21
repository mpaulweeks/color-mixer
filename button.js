export class Button {
  constructor(label, callback) {
    this.label = label;
    this.callback = callback;

    // defaults
    this.origin = {x: 0, y: 0};
    this.radius = 0;
  }
  contains(point) {
    const { origin, radius } = this;
    return Math.sqrt(
      Math.pow(origin.x - point.x, 2) +
      Math.pow(origin.y - point.y, 2)
     ) < radius;
  }
}
