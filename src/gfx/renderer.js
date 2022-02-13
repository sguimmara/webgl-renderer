var gl;

/**
 * The Renderer class manages all calls to the WebGL context.
 */
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        gl = getContext(canvas);

        this.setupViewport();
    }

    render(timestamp) {
        console.log("render " + timestamp);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    setupViewport() {
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.33, 0.33, 0.33, 1.0);
        gl.depthFunc(gl.LEQUAL);
    }
}

/**
 * Attempts to retrieve the WebGL context from the specified canvas.
 * @param {} canvas the DOM canvas
 * @returns {[WebGL2RenderingContext]} a WebGL context
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