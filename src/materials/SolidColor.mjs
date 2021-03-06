import MaterialBase from './MaterialBase';
import ColorUniform from '../renderer/ColorUniform';

export default class SolidColor extends MaterialBase {
	constructor() {
		super('solidColor');
		this.attributes = {
			'a_position': {
				size: 3
			}
		};
		this.uniforms.color = new ColorUniform('u_color');
	}

	/** @param {Color} Color The new color. */
	set color(Color) {
		this.uniforms.color.value = Color;
		this.dirty();
	}
}
