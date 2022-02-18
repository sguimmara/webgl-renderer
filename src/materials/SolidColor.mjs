import MaterialBase from './MaterialBase';
import RgbaUniform from '../renderer/RgbaUniform';

export default class SolidColor extends MaterialBase {
	constructor() {
		super('solidColor');
		this.attributes = {
			'a_position': {
				size: 3
			}
		};
		this.uniforms.color = new RgbaUniform('u_color');
	}

	/** @param {Rgba} rgba The new color. */
	set color(rgba) {
		this.uniforms.color.value = rgba;
		this.dirty();
	}
}
