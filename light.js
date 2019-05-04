import { Color } from './color.js';

export class Light {
  constructor(data) {
    this.color = Color.fromHex(data.hex);
    this.color.brightness = Math.random();
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
