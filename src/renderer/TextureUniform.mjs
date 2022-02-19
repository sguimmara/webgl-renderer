import Uniform from "./Uniform";

export default class TextureUniform extends Uniform {
    constructor(location,) {
        super(location, 0, 'i')
		this._texture = undefined;
    }

	set texture(texture) {
		this._texture = texture;
	}

	get texture() {
		return this._texture;
	}
}
