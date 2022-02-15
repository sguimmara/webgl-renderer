const VertexShader = Symbol('vertex-shader');
const FragmentShader = Symbol('fragment-shader');

export default class Pipeline {
  /**
   * @param {WebGLRenderingContext} gl The WebGL rendering context.
   * @param {string} name The name of this object.
   */
  constructor(gl, name) {
    /** @type string */
    this.name = name;
    /** @type WebGLRenderingContext */
    this.gl = gl;
    /** @type WebGLShader */
    this.vertex_shader = undefined;
    /** @type WebGLShader */
    this.fragment_shader = undefined;
    /** @type WebGLProgram */
    this.program = undefined;
    /** @type boolean */
    this.dirty = true;
  }

  /**
     * If the state has changed since last call, recreate WebGL program and uploads it to the GPU.
     */
  commit() {
    // nothing to commit, the Pipeline is clean
    if (!this.dirty) {
      return;
    }

    if (!this.vertex_shader || !this.fragment_shader) {
      throw new Error(`${this.describe()}: cannot commit Pipeline, missing shaders`);
    }

    if (!this.program) {
      this.program = this.gl.createProgram();
    }

    this.gl.attachShader(this.program, this.vertex_shader);
    this.gl.attachShader(this.program, this.fragment_shader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      throw new Error('could not compile shader');
    }

    this.gl.useProgram(this.program);
    this.dirty = false;
  }

  bind() {
    this.commit();

    this.gl.useProgram(this.program);
  }

  describe() { return `<Pipeline ${this.name}>`; }

  /**
     * @param {String} source
     */
  set vertexShader(source) {
    this.vertex_shader = this.createShader(source, VertexShader);
    this.dirty = true;
  }

  /**
     * @param {String} source
     */
  set fragmentShader(source) {
    this.fragment_shader = this.createShader(source, FragmentShader);
    this.dirty = true;
  }

  mapShaderType(type) {
    switch (type) {
      case VertexShader: return this.gl.VERTEX_SHADER;
      case FragmentShader: return this.gl.FRAGMENT_SHADER;
      default:
        throw new Error(`invalid shader type: ${type}`);
    }
  }

  createShader(source, type) {
    const result = this.gl.createShader(this.mapShaderType(type));
    this.gl.shaderSource(result, source);
    this.gl.compileShader(result);
    return result;
  }
}
