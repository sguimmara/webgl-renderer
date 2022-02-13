export class VertexBuffer {
    constructor(gl, vertices) {
        this.gl = gl;
        this.glBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    }
}

export class IndexBuffer {
    constructor(gl, indices) {
        this.gl = gl;
        this.glBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
    }
}

export class Mesh {
    constructor(gl, name) {
        this.name = name;
        this.gl = gl;
        this.positionBuffer = undefined;
        this.indexBuffer = undefined;
    }

    /**
     * @param {number[]} array
     */
    set positions (array) { this.positionBuffer = new VertexBuffer(this.gl, array); }
    /**
     * @param {number[]} array
     */
    set indices (array) { this.indexBuffer = new IndexBuffer(this.gl, array); }
}