import MaterialBase from './Materials/MaterialBase';
import Mesh from './Mesh';
import ProgramFactory from './ProgramFactory';

/**
 * The Renderer class manages all calls to the WebGL context.
 */
export default class Renderer {
  /**
   *
   * @param {HTMLCanvasElement} canvas The canvas to render to.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    /** @type {ProgramFactory} */
    this.programFactory = new ProgramFactory(this.gl);

    this.setupViewport();
  }

  async initialize() {
    await this.programFactory.initialize();
  }

  createMaterial(name) {
    const program = this.programFactory.get(name);
    return new MaterialBase(this.gl, program);
  }

  clear() {
    // eslint-disable-line no-bitwise
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  /**
   *
   * @param {Entity} entity The entity to render.
   */
  render(entity) {
    entity.material.bind();
    this.drawMesh(entity.mesh);
  }

  /**
   * Draws a mesh using the currently bound Material.
   * @param {Mesh} mesh The mesh to draw.
   */
  drawMesh(mesh) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.positionBuffer.glBuffer);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer.glBuffer);

    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
  }

  setupViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.33, 0.33, 0.33, 1.0);
    this.gl.depthFunc(this.gl.LEQUAL);
  }

  createMesh(name) {
    return new Mesh(this.gl, name);
  }
}
