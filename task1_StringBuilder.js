class StringBuilder {
  #value;

  constructor(baseString = '') {
    this.#value = baseString;
  }

  append(str) {
    this.#value = this.#value + str;
    return this;
  }

  prepend(str) {
    this.#value = str + this.#value;
    return this;
  }

  pad(str) {
    this.prepend(str).append(str);
    return this;
  }

  toString() {
    return this.#value;
  }
}


const builder = new StringBuilder('.');

builder
  .append('^')
  .prepend('^')
  .pad('=');

console.log(builder); // '=^.^='
