export default class VertexBuffer {
  /**
   * 
   * @param {WebGLRenderingContext} gl The WebGL rendering context.
   * @param {number[]} vertices 
   */
  constructor(gl, vertices) {
    this.gl = gl;
    this.glBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  }
}
