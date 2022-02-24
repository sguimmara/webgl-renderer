import MaterialBase from './MaterialBase';

export default class UnlitTexture extends MaterialBase {
	constructor() {
		super('unlit-texture');
		this.uniforms['u_texture'] = {
			type: "tex2d",
			unit: 0,
			texture: null
		};
		this.attributes['a_texcoords'] = { size: 2 };
	}

	/** @param {Texture2D} texture The texture. */
	set texture(texture) {
		this.uniforms['u_texture'].texture = texture;
		this.dirty();
	}
}
