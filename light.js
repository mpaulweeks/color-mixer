import { Button } from './button.js';
import { Color } from './color.js';

export class Light {
  constructor(color) {
    this.color = Color.fromHex(color);
    this.origin = {x: 0, y: 0};
    this.radius = 0;
    this.buttonDarker = new Button('dark', () => this.color.darken());
    this.buttonLighter = new Button('light', () => this.color.brighten());
    this.buttons = [this.buttonDarker, this.buttonLighter];
  }
  calibrateButtons() {
    this.buttonDarker.origin = {
      x: this.origin.x - this.radius*1.5,
      y: this.origin.y - this.radius*1.5,
    };
    this.buttonLighter.origin = {
      x: this.origin.x + this.radius*1.5,
      y: this.origin.y - this.radius*1.5,
    };
    this.buttons.forEach(b => {
      b.radius = this.radius;
    });
  }
}
