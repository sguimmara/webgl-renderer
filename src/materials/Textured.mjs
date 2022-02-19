import MaterialBase from './MaterialBase';
import TextureUniform from '../renderer/TextureUniform.mjs';

export default class Textured extends MaterialBase {
	constructor() {
		super('textured');
		this.uniforms.texture = new TextureUniform('s2d_color');
	}

	/** @param {Texture2D} texture The texture. */
	set texture(texture) {
		this.uniforms.texture.texture = texture;
		this.dirty();
	}
}
