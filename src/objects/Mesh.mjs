import BaseObject from './BaseObject.mjs';

export default class Mesh extends BaseObject {
	constructor() {
		super()
		this.buffers =
		{
			'a_position': {
				data: undefined
			}
		};
		/** @type {number[]} */
		this.indexBuffer = undefined;
		this.count = 0;
	}

	/**
	   * @param {number[]} array
	   */
	set positions(array) {
		if (array == null) {
			throw new Error('invalid vertex array');
		}
		this.buffers['a_position'].data = new Float32Array(array);
	}

	/**
	   * @param {number[]} array
	   */
	set texcoords(array) {
		if (array == null) {
			throw new Error('invalid vertex array');
		}
		this.buffers['a_texcoords'] = {
			data: new Float32Array(array)
		}
	}

	/**
	   * @param {number[]} array
	   */
	set indices(array) {
		if (array == null) {
			throw new Error('invalid index array');
		}
		this.indexBuffer = new Uint16Array(array);
		this.count = array.length;
	}
}
