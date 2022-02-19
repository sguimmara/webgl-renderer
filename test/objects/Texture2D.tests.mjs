import { describe, it } from 'mocha';
import * as assert from 'assert';
import * as Gfx from '../../src/Gfx';

describe('Texture2D', () => {

	describe('constructor', () => {
		it('should assign width and height properties', () => {
			const width = 257;
			const height = 141;
			let sut = new Gfx.Texture2D(width, height);
			assert.deepEqual(width, sut.width);
			assert.deepEqual(height, sut.height);
		})
	})

	describe('data', () => {
		it('set should throw on invalid array size', () => {
			const width = 257;
			const height = 141;
			let sut = new Gfx.Texture2D(width, height);

			assert.throws(() => {
				sut.data = new Uint8Array(width * height * 3);
			});
		})

		it('get should return the previously set array', () => {
			const width = 1;
			const height = 2;
			const arr = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
			let sut = new Gfx.Texture2D(width, height);
			sut.data = arr;

			assert.deepEqual(sut.data, arr);
		})
	})
});
