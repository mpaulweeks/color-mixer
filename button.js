export class Button {
  constructor(elm, label, callback) {
    this.elm = elm;
    elm.innerHTML = label;
    this.callback = callback;
  }
}
