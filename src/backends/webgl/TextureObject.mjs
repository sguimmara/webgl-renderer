export default class TextureObject {
	/**
	 *
	 * @param {WebGLRenderingContext} gl The WebGL rendering context.
	 * @param {*} texture
	 */
	constructor(gl, texture) {
		this.gl = gl;
		this.texture = texture;
		this.webGlTexture = gl.createTexture();
	}

	update() {
		const GL = this.gl;
		GL.bindTexture(GL.TEXTURE_2D, this.webGlTexture);
		const format = GL.RGBA;
		GL.texImage2D(
			GL.TEXTURE_2D,
			0,
			format,
			this.texture.width,
			this.texture.height,
			0,
			format,
			GL.UNSIGNED_BYTE,
			this.texture.data);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
	}

	bind(uniform) {
		const GL = this.gl;
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, this.webGlTexture);
		GL.uniform1i(uniform, 0);
	}
}
