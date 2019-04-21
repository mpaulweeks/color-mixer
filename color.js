export class Color {
  constructor(parts) {
    this.r = parts.r;
    this.g = parts.g;
    this.b = parts.b;
    this.brightness = parts.brightness;
  }

  brighten() {
    return this.brightness = Math.min(this.brightness + 0.003, 1.0);
  }
  darken() {
    this.brightness = Math.max(this.brightness - 0.003, 0);
  }

  static normalizeRGB(val) {
    return Math.min(255, Math.max(0, Math.floor(val)));
  }

  toHexWithBrightness(brightness) {
    const {r, g, b} = this;
    return '#' + [r,g,b].map(int =>
      Math.floor(int * brightness)
      .toString(16)
      .padStart(2, '0')
    ).join('');
  }
  toHex() {
    return this.toHexWithBrightness(this.brightness);
  }
  toHexOriginal() {
    return this.toHexWithBrightness(1.0);
  }
  static fromHex(hexcode) {
    const parts = [1,3,5]
      .map(i => hexcode.substring(i, i+2))
      .map(hex => parseInt(hex, 16));
    return new Color({
      r: parts[0],
      g: parts[1],
      b: parts[2],
      brightness: 1.0,
    });
  }
  static combine(colors) {
    const calcAvg = (prop) => {
      const newValue = colors.reduce((sum, c) => {
        const val = c[prop] * c.brightness;
        return sum + val;
      }, 0);
      return this.normalizeRGB(newValue)
    }
    return new Color({
      r: calcAvg('r'),
      g: calcAvg('g'),
      b: calcAvg('b'),
      brightness: 1.0,
    });
  }
}
