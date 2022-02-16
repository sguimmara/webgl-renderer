export default class WebGLMaterial {
  /**
     * @param {WebGLRenderingContext} gl The WebGL context.
     * @param {MaterialBase} material The material.
     * @param {ProgramFactory} programFactory The ProgramFactory.
     */
  constructor(gl, material, programFactory) {
    this.gl = gl;
    /** @type {MaterialBase} */
    this.material = material;
    this.program = programFactory.get(material.programName());
    this.version = -1;
  }

  set() {
      if (this.version !== this.material.version) {
          this.update();
      }
  }

  update() {
      this.gl.useProgram(this.program);
      this.updateUniforms(this.material.uniforms);
      // TODO
  }

  updateUniforms(uniforms) {
      for (const [key, uniform] of Object.entries(uniforms)) {
          let location = this.gl.getUniformLocation(this.program, uniform.location);
          this.assignUniform(location, uniform);
      }
  }

  assignUniform(loc, uniform) {
    switch (uniform.type) {
        case '4f': {
            let [x, y, z, w] = uniform.value.asTuple();
            this.gl.uniform4f(loc, x, y, z, w);
            break;
        }
    }
  }
}
