export default class ProgramLoader {
	/**
	   * @param {WebGLRenderingContext} gl The WebGL rendering context.
	   */
	constructor(gl) {
		this.gl = gl;
		this.cache = {};
	}

	/**
	   * Initializes the cache with the default shaders.
	   */
	async initialize() {
		await this.loadFromAssets('default.vert.glsl', 'default.frag.glsl', 'default');
		await this.loadFromAssets('default.vert.glsl', 'solidColor.frag.glsl', 'solidColor');
	}

	/**
	   * Fetches a WebGLProgram from the cache, if any. Otherwise, returns null.
	   * @param {string} name The program name.
	   * @returns {WebGLProgram} The program in the cache, or null.
	   * @public
	   */
	get(name) {
		if (name in this.cache) {
			return this.cache[name];
		}

		return null;
	}

	async loadFromAssets(vsName, fsName, name) {
		const vs = await this.fetchSource(`/assets/shaders/${vsName}`);
		const fs = await this.fetchSource(`/assets/shaders/${fsName}`);
		this.create(vs, fs, name);
	}

	/**
	   * Fetches the GLSL source code of a shader.
	   * @param {string} uri The URI of the source.
	   * @returns {Promise<string>} The text.
	   */
	async fetchSource(uri) {
		const response = await fetch(uri);
		if (response.ok) {
			return response.text();
		}

		throw new Error(`could not fetch GLSL source at ${uri}: ${response.status} ${response.statusText}`);
	}

	/**
	   * Creates a WebGLProgram with the specified name and GLSL sources.
	   * @param {string} vsSource The GLSL source code for the vertex shader.
	   * @param {string} fsSource The GLSL source code for the fragment shader.
	   * @param {string} name The unique name of this program.
	   * @returns {WebGLProgram} The generated program.
	   * @public
	   */
	create(vsSource, fsSource, name) {
		if (name in this.cache) {
			throw new Error(`could not create program: the key '${name}' is already in the cache.`);
		}

		const result = this.createProgram(vsSource, fsSource);
		this.cache[name] = result;
		return result;
	}

	/**
	   * Creates a WebGLProgram from the specified GLSL sources.
	   * @param {string} vsSource The GLSL source code for the vertex shader.
	   * @param {string} fsSource The GLSL source code for the fragment shader.
	   * @returns {WebGLProgram} The generated program.
	   * @private
	   */
	createProgram(vsSource, fsSource) {
		const vs = this.createShader(vsSource, this.gl.VERTEX_SHADER);
		const fs = this.createShader(fsSource, this.gl.FRAGMENT_SHADER);

		const result = this.gl.createProgram();
		this.gl.attachShader(result, vs);
		this.gl.attachShader(result, fs);
		this.gl.linkProgram(result);

		if (!this.gl.getProgramParameter(result, this.gl.LINK_STATUS)) {
			const info = this.gl.getProgramInfoLog(result);
			throw new Error(`could not create WebGLProgram: ${info}`);
		}

		return result;
	}

	/**
	   * Creates a WebGLShader from the specified source code and type.
	   * @param {string} source The source GLSL code.
	   * @param {number} type The shader type. Must be either VERTEX_SHADER or FRAGMENT_SHADER.
	   * @returns {WebGLShader}
	   * @private
	   */
	createShader(source, type) {
		const result = this.gl.createShader(type);
		this.gl.shaderSource(result, source);
		this.gl.compileShader(result);
		return result;
	}
}
