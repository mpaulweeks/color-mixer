import { Color } from './color.js';

export class Light {
  constructor(data) {
    this.color = Color.fromHex(data.hex);
    this.color.brightness = 0.0;
    this.elm = document.getElementById(data.id);

    this.percentElm = this.elm.querySelector('.percent');

    this.sourceElm = this.elm.querySelector('.source');
    this.sourceFillElm = this.sourceElm.children[0];
    this.sourceFillElm.style.backgroundColor = this.color.toHexOriginal();
  }

  updateFill() {
    this.percentElm.innerText = (100 * this.color.brightness).toFixed(0) + '%';
    this.sourceFillElm.style.width = ((1 - this.color.brightness) * 100) + '%';
  }
}

export class Combined {
  constructor(data) {
    this.elm = document.getElementById(data.id);
    this.color = Color.fromHex('#000000');
  }
}

export class Goal {
  constructor(data) {
    this.elm = document.getElementById(data.id);
    this.color = null;
  }
  randomize(other) {
    while (!this.color || this.color.calcDistance(other) < 200) {
      this.color = new Color({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        brightness: 1.0,
      });
    }
  }
  matches(color) {
    const distance = color.calcDistance(this.color);
    return distance < 50;
  }
}
