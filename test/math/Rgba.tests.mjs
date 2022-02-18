import { describe, it } from 'mocha';
import assert from 'assert';
import * as Gfx from '../../src/Gfx';

describe('Rgba', () => {
	describe('constructor', () => {
		it('should assign [r, g, b, a] fields', () => {
			const sut = new Gfx.Rgba(1, 2, 3, 4);
			assert.deepEqual(1, sut.r);
			assert.deepEqual(2, sut.g);
			assert.deepEqual(3, sut.b);
			assert.deepEqual(4, sut.a);
		});
	});

	describe('asTuple', () => {
		it('should returns the values in the [r, g, b, a] order', () => {
			const sut = new Gfx.Rgba(1, 2, 3, 4);
			assert.deepEqual([1, 2, 3, 4], sut.asTuple);
		});
	});
});
