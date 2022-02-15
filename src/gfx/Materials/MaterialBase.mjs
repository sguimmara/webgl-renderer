export default class MaterialBase {
  /**
     *
     * @param {WebGLRenderingContext} gl the WebGL rendering context.
     * @param {WebGLProgram} program the WebGL program.
     */
  constructor(gl, program) {
    this.gl = gl;
    this.program = program;
    this.attributes = {};
    this.attributes.position = this.gl.getAttribLocation(this.program, 'position');
  }

  bind() {
    this.gl.useProgram(this.program);
    this.gl.enableVertexAttribArray(this.attributes.position);
    this.gl.vertexAttribPointer(this.attributes.position, 3, this.gl.FLOAT, false, 0, 0);
  }
}
