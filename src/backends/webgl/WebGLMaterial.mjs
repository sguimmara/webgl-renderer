import TextureObject from "./TextureObject.mjs";

export default class WebGLMaterial {
	/**
	   * @param {WebGLRenderingContext} gl The WebGL context.
	   * @param {MaterialBase} material The material.
	   * @param {ProgramLoader} programLoader The ProgramLoader.
	   */
	constructor(gl, material, programLoader) {
		this.gl = gl;
		/** @type {MaterialBase} */
		this.material = material;
		this.program = programLoader.get(material.programName);
		this.version = -1;
		this.attributes = {};
	}

	set() {
		this.update();
		if (this.version !== this.material.version) {
			this.update();
			this.version = this.material.version;
		}
	}

	update() {
		this.gl.useProgram(this.program);
		this.updateAttributes(this.material.attributes);
		this.updateUniforms(this.material.uniforms);
	}

	updateAttributes(attributes) {
		for (const [key, attribute] of Object.entries(attributes)) {
			var location = this.gl.getAttribLocation(this.program, key);
			this.attributes[key] = {
				location: location,
				size: attribute.size,
				type: this.gl.FLOAT
			};
		}
	}

	updateUniforms(uniforms) {
		for (const [key, value] of Object.entries(uniforms)) {
			let location = this.gl.getUniformLocation(this.program, key);
			this.assignUniform(location, value);
		}
	}

	assignUniform(loc, uniform) {
		const GL = this.gl;
		switch (uniform.type) {
			case 'tex2d': {
				if (uniform.textureObject == undefined) {
					uniform.textureObject = new TextureObject(GL, uniform.texture);
				}
				uniform.textureObject.update();
				uniform.textureObject.bind(loc);
				break;
			}
			case 'color': {
				let [x, y, z, w] = uniform.value.asTuple;
				GL.uniform4f(loc, x, y, z, w);
				break;
			}
		}
	}
}
