import { Button } from './button.js';
import { Color } from './color.js';

export class Light {
  constructor(data) {
    this.color = Color.fromHex(data.hex);
    this.elm = document.getElementById(data.id);

    this.buttonDarker = new Button(this.elm.children[0], '↓', () => this.color.darken());
    this.buttonLighter = new Button(this.elm.children[1], '↑', () => this.color.brighten());
    this.buttons = [this.buttonDarker, this.buttonLighter];

    const labelElm = this.elm.children[2];
    labelElm.innerText = {
      r: 'Red',
      g: 'Green',
      b: 'Blue',
    }[data.id];
    labelElm.style.borderBottomColor = this.color.toHexOriginal();

    this.sourceElm = this.elm.children[3];
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
