import { Pipeline } from './pipeline.js';

/**
 * The Renderer class manages all calls to the WebGL context.
 */
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.GL = getContext(canvas);

        this.setupViewport();
    }

    render(timestamp) {
        console.log("render " + timestamp);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
    }

    setupViewport() {
        this.GL.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.GL.enable(this.GL.DEPTH_TEST);
        this.GL.clearColor(0.33, 0.33, 0.33, 1.0);
        this.GL.depthFunc(this.GL.LEQUAL);
    }

    createProgram(name) {
        console.log(`creating Pipeline <${name}>`);
        return new Pipeline(this.GL, name);
    }
}

/**
 * Attempts to retrieve the WebGL context from the specified canvas.
 * @param {HTMLCanvasElement} canvas the DOM canvas
 * @returns {WebGL2RenderingContext} a WebGL context
 */
function getContext(canvas) {
    try {
        return canvas.getContext("webgl");
    }
    catch (e) {
        console.error(e);
        alert("Unable to initialize WebGL.");
        return null;
    }
}