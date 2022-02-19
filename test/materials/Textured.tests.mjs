import { describe, it } from 'mocha';
import assert from 'assert';
import * as Gfx from '../../src/Gfx';
import TextureUniform from '../../src/renderer/TextureUniform.mjs';

describe('Textured', () => {

	describe('constructor', () => {

		it('should create a <texture> uniform', () => {
			const sut = new Gfx.Textured(52, 138);

			assert.notEqual(undefined, sut.uniforms);
			assert.notEqual(undefined, sut.uniforms.texture);
			assert.deepEqual(sut.uniforms.texture instanceof TextureUniform, true);
			assert.deepEqual(sut.uniforms.texture.location, 's2d_color');
		});
	})

	describe('set texture', () => {
		it("should set the underlying uniform's texture", () => {
			const width = 8;
			const height = 34;
			let sut = new Gfx.Textured();
			let tex = new Gfx.Texture2D(width, height);
			sut.texture = tex;

			assert.deepEqual(sut.uniforms.texture.texture, tex);
		})

		it('should update the version', () => {
			let sut = new Gfx.Textured();
			assert.deepEqual(sut.version, 0);

			let tex = new Gfx.Texture2D(8, 8);
			sut.texture = tex;
			assert.deepEqual(sut.version, 1);
		})
	})
});
