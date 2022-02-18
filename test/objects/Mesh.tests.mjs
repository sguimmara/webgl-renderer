import { describe, it } from 'mocha';
import assert from 'assert';
import * as Gfx from '../../src/Gfx';

describe('Mesh', () => {
	describe('constructor', () => {
		it('should assign default "a_position" buffer', () => {
			const sut = new Gfx.Mesh();

			assert.notEqual(undefined, sut.buffers);
			assert.notEqual(undefined, sut.buffers['a_position']);
		});
	});

	describe('set positions', () => {
		it('should assign a Float32Array to the "a_position" buffer', () => {
			let sut = new Gfx.Mesh();

			sut.positions = [0, 1, 2];

			assert.deepEqual(new Float32Array([0, 1, 2]), sut.buffers['a_position'].data);
		});
	});

	describe('set indices', () => {
		it('should assign a Uint16Array to the indexBuffer', () => {
			let sut = new Gfx.Mesh();

			sut.indices = [0, 1, 2];

			assert.deepEqual(new Uint16Array([0, 1, 2]), sut.indexBuffer);
		});
	});

});
