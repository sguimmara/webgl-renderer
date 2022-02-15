import Mesh from './Mesh';
import Pipeline from './Pipeline';

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
    this.gl = getContext(canvas);

    this.setupViewport();
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  renderMesh(mesh, pipeline) {
    pipeline.bind();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.positionBuffer.glBuffer);
    const posAttr = this.gl.getAttribLocation(pipeline.program, 'position');
    this.gl.enableVertexAttribArray(posAttr);
    this.gl.vertexAttribPointer(posAttr, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer.glBuffer);

    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
  }

  setupViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.33, 0.33, 0.33, 1.0);
    this.gl.depthFunc(this.gl.LEQUAL);
  }

  createPipeline(name) {
    return new Pipeline(this.gl, name);
  }

  createMesh(name) {
    return new Mesh(this.gl, name);
  }
}

/**
 * Attempts to retrieve the WebGL context from the specified canvas.
 * @param {HTMLCanvasElement} canvas the DOM canvas
 * @returns {WebGLRenderingContext} a WebGL context
 */
function getContext(canvas) {
  try {
    return canvas.getContext('webgl');
  } catch (e) {
    throw new Error('Unable to initialize WebGL context from canvas.');
  }
}
