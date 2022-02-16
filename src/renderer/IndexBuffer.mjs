export default class IndexBuffer {
  /**
   * Creates a new IndexBuffer.
   * @param {WebGLRenderingContext} gl The WebGL rendering context.
   * @param {number[]} indices The index array.
   */
  constructor(gl, indices) {
    this.gl = gl;
    this.glBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
  }
}
