export default class Texture2D {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this._buf = undefined;
	}

	/**
	 * @param {Uint8Array} array A 8-bit pixel array.
	 */
	set data(array) {
		const expectedSize = this.width * this.height * 4;
		if (array.length != expectedSize) {
			throw new Error(`invalid array size, expected ${expectedSize}, got: ${array.length}`);
		}

		this._buf = array;
	}

	/**
	 * @returns {Uint8Array} array A 8-bit pixel array.
	 */
	get data() {
		return this._buf;
	}
}
