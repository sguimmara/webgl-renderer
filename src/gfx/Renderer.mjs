import Mesh from './Mesh';
import Pipeline from './Pipeline';

/**
 * The Renderer class manages all calls to the WebGL context.
 */
export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.GL = getContext(canvas);

    this.setupViewport();
  }

  clear() {
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  renderMesh(mesh, pipeline) {
    pipeline.bind();

    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, mesh.positionBuffer.glBuffer);
    const posAttr = this.GL.getAttribLocation(pipeline.program, 'position');
    this.GL.enableVertexAttribArray(posAttr);
    this.GL.vertexAttribPointer(posAttr, 3, this.GL.FLOAT, false, 0, 0);

    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer.glBuffer);

    this.GL.drawElements(this.GL.TRIANGLES, 6, this.GL.UNSIGNED_SHORT, 0);
  }

  setupViewport() {
    this.GL.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.GL.enable(this.GL.DEPTH_TEST);
    this.GL.clearColor(0.33, 0.33, 0.33, 1.0);
    this.GL.depthFunc(this.GL.LEQUAL);
  }

  createPipeline(name) {
    return new Pipeline(this.GL, name);
  }

  createMesh(name) {
    return new Mesh(this.GL, name);
  }
}

/**
 * Attempts to retrieve the WebGL context from the specified canvas.
 * @param {HTMLCanvasElement} canvas the DOM canvas
 * @returns {WebGL2RenderingContext} a WebGL context
 */
function getContext(canvas) {
  try {
    return canvas.getContext('webgl');
  } catch (e) {
    throw new Error('Unable to initialize WebGL context from canvas.');
  }
}
