import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';

export default class Mesh {
  constructor(gl, name) {
    this.name = name;
    this.gl = gl;
    this.positionBuffer = undefined;
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
