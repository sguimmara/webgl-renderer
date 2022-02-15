import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';

export default class Mesh {
  /**
     * @param {WebGLRenderingContext} gl The WebGL rendering context.
     * @param {string} name The name of this object.
     */
  constructor(gl, name) {
    /** @type string */
    this.name = name;
    /** @type WebGLRenderingContext */
    this.gl = gl;
    /** @type VertexBuffer */
    this.positionBuffer = undefined;
    /** @type IndexBuffer */
    this.indexBuffer = undefined;
  }

  /**
     * @param {number[]} array
     */
  set positions(array) { this.positionBuffer = new VertexBuffer(this.gl, array); }

  /**
     * @param {number[]} array
     */
  set indices(array) { this.indexBuffer = new IndexBuffer(this.gl, array); }
}
