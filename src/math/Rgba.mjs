export default class Rgba {
  /**
     * @param {number} r The red component.
     * @param {number} g The green component.
     * @param {number} b The blue component.
     * @param {number} a The alpha component.
     */
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  get asTuple() {
      return [this.r, this.g, this.b, this.a];
  }

  static get BLACK() { return new Rgba(0, 0, 0, 1); }

  static get RED() { return new Rgba(1, 0, 0, 1); }
}
