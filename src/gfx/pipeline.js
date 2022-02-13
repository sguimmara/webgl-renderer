const VertexShader = Symbol("vertex-shader")
const FragmentShader = Symbol("fragment-shader");

export class Pipeline {
    constructor(glContext, name) {
        this.name = name;
        this.gl = glContext;
        this.vertex_shader = undefined;
        this.fragment_shader = undefined;
        this.program = undefined;
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

        console.log(`compiling Pipeline <${this.name}>`);

        if (!this.vertex_shader || !this.fragment_shader) {
            throw new Error("cannot commit Pipeline, missing shaders");
        }

        if (!this.program) {
            this.program = this.gl.createProgram();
        }

        this.gl.attachShader(this.program, this.vertex_shader);
        this.gl.attachShader(this.program, this.fragment_shader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new Error("could not compile shader");
        }

        this.gl.useProgram(this.program);
        this.dirty = false;
    }

    /**
     * @param {String} source
     */
    set vertexShader (source) { this.vertex_shader = this.createShader(source, VertexShader); }

    /**
     * @param {String} source
     */
    set fragmentShader (source) { this.fragment_shader = this.createShader(source, FragmentShader); }

    mapShaderType(type) {
        switch (type) {
            case VertexShader: return this.gl.VERTEX_SHADER;
            case FragmentShader: return this.gl.FRAGMENT_SHADER;
            default:
                throw new Error("invalid shader type: " + type);
        }
    }

    createShader(source, type) {
        var result = this.gl.createShader(type);
        this.gl.shaderSource(result, source);
        this.gl.compileShader(result);
    }
}