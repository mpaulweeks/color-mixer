import { Color } from './color.js';

export class Light {
  constructor(data) {
    this.color = Color.fromHex(data.hex);
    // this.color.brightness = Math.random();
    this.elm = document.getElementById(data.id);

    const labelElm = this.elm.children[0];
    labelElm.innerText = {
      r: 'Red',
      g: 'Green',
      b: 'Blue',
    }[data.id];
    labelElm.style.borderBottomColor = this.color.toHexOriginal();

    this.sourceElm = this.elm.children[1];
    this.sourceFillElm = this.sourceElm.children[0];
    this.sourceFillElm.style.backgroundColor = this.color.toHexOriginal();
  }

  updateFill() {
    this.sourceFillElm.style.height = (this.color.brightness * 100) + '%';
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
