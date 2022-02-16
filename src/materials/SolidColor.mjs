import MaterialBase from './MaterialBase';
import RgbaUniform from '../renderer/RgbaUniform';

export default class SolidColor extends MaterialBase {
  constructor() {
    super('default');
    this.attributes.POSITION = { location: 'a_position' };
    this.uniforms.color = new RgbaUniform('u_color');
  }

  /** @param {Rgba} rgba The new color. */
  set color(rgba) {
    this.uniforms.color.value = rgba;
    this.dirty();
  }
}
