export default class GlBuffer {
	constructor(gl, name, datatype) {
		this.gl = gl;
		this.name = name;
		this.buffer = gl.createBuffer();
		this.datatype = datatype;
	}

	update(data) {
		if (data == null) {
			throw new Error('null data');
		}
		this.gl.bindBuffer(this.datatype, this.buffer);
		this.gl.bufferData(this.datatype, data, this.gl.STATIC_DRAW);
	}
}
