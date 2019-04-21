import { Button } from './button.js';
import { Color } from './color.js';

export class Light {
  constructor(data) {
    this.color = Color.fromHex(data.hex);
    this.elm = document.getElementById(data.id);

    const buttonRow = this.elm.children[0];
    const sourceRow = this.elm.children[1];

    this.buttonDarker = new Button(buttonRow.children[0], 'dark', () => this.color.darken());
    this.buttonLighter = new Button(buttonRow.children[1], 'light', () => this.color.brighten());
    this.buttons = [this.buttonDarker, this.buttonLighter];

    const sourceElm = sourceRow.children[0];
    sourceElm.style.backgroundColor = this.color.toHexOriginal();
  }
}

export class Combined {
  constructor(data) {
    this.elm = document.getElementById(data.id);
    this.color = Color.fromHex('#000000');
  }
}
