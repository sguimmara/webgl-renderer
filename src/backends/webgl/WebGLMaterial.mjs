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
		for (const uniform of Object.values(uniforms)) {
			let location = this.gl.getUniformLocation(this.program, uniform.location);
			this.assignUniform(location, uniform);
		}
	}

	assignUniform(loc, uniform) {
		switch (uniform.type) {
			case '4f': {
				let [x, y, z, w] = uniform.value.asTuple;
				this.gl.uniform4f(loc, x, y, z, w);
				break;
			}
		}
	}
}
