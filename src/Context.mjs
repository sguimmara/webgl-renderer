import ProgramLoader from "./backends/webgl/ProgramLoader.mjs";
import WebGLMaterial from "./backends/webgl/WebGLMaterial.mjs";
import GlBuffer from "./backends/webgl/GlBuffer.js";

export default class Context {
	/**
	 *
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.gl = canvas.getContext('webgl');
		this.materialMap = {};
		this.buffers = {};

		if (this.gl == undefined) {
			console.error('could not find WebGL context in specified canvas');
		}

		this.programLoader = new ProgramLoader(this.gl);
		this.setupViewport();

		window.requestAnimationFrame(() => this.render());
	}

	async initialize() {
		await this.programLoader.initialize();
	}

	clear() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	render() {
		// this.clear();
		// window.requestAnimationFrame(() => this.render());
	}

	setupViewport() {
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.clearColor(0.3, 0.5, 0.6, 1.0);
		this.gl.depthFunc(this.gl.LEQUAL);
	}

	renderNodes(nodes) {
		this.clear();

		nodes.forEach(node => {
			this.renderNode(node);
		});
	}

	renderNode(node) {
		let webGlMat = this.bind(node.material);
		this.draw(node.mesh, webGlMat);
	}

	/**
	 * Sets the material as the active material.
	 * @param {MaterialBase} material the material to bind.
	 */
	bind(material) {
		if (material.uuid in this.materialMap === false) {
			this.materialMap[material.uuid] = this.createMappedMaterial(material);
		}

		let mat = this.materialMap[material.uuid];
		this.gl.useProgram(mat.program);
		mat.set();
		return mat;
	}

	createMappedMaterial(material) {
		return new WebGLMaterial(this.gl, material, this.programLoader);
	}

	draw(mesh, material) {
		console.log(mesh);
		if (mesh.uuid in this.buffers === false) {
			this.buffers[mesh.uuid] = {};
		}
		let entry = this.buffers[mesh.uuid];

		for (const [key, buf] of Object.entries(mesh.buffers)) {
			this.bindVertexBuffer(entry, material, key, buf);
		}

		this.bindIndexBuffer(mesh, entry);

		this.gl.drawElements(this.gl.TRIANGLES, mesh.count, this.gl.UNSIGNED_SHORT, 0);
	}

	bindIndexBuffer(mesh, entry) {
		let indexBuffer;
		const KEY = 'indices';
		if (KEY in entry == false) {
			indexBuffer = new GlBuffer(this.gl, KEY, this.gl.ELEMENT_ARRAY_BUFFER);
			indexBuffer.update(mesh.indexBuffer);
			entry[KEY] = indexBuffer;
		}
		else {
			indexBuffer = entry[KEY];
		}

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
	}

	bindVertexBuffer(entry, material, key, buf) {
		let vertexBuffer;
		if (key in entry === false) {
			vertexBuffer = new GlBuffer(this.gl, key, this.gl.ARRAY_BUFFER);
			vertexBuffer.update(buf.data);
			entry[key] = vertexBuffer;
		}
		else {
			vertexBuffer = entry[key];
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);

		let attrib = material.attributes[key];
		this.gl.enableVertexAttribArray(attrib.location);
		this.gl.vertexAttribPointer(attrib.location, attrib.size, attrib.type, false, 0, 0);
	}
}
