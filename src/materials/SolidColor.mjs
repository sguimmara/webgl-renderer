import MaterialBase from './MaterialBase';

export default class SolidColor extends MaterialBase {
	constructor() {
		super('solidColor');
		this.uniforms['u_color'] = {
			type: "color",
			value: null
		};
	}

	/** @param {Color} Color The new color. */
	set color(Color) {
		this.uniforms['u_color'].value = Color;
		this.dirty();
	}
}
