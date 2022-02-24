import { describe, it } from 'mocha';
import assert from 'assert';
import * as Gfx from '../../src/Gfx';

describe('UnlitTexture', () => {

	describe('constructor', () => {

		it('should create a <texture> uniform', () => {
			const sut = new Gfx.UnlitTexture(52, 138);

			assert.notEqual(undefined, sut.uniforms);
			assert.notEqual(undefined, sut.uniforms['u_texture']);
			let texture = sut.uniforms['u_texture'];
			assert.deepEqual(texture.unit, 0);
		});
	})

	describe('set texture', () => {
		it("should set the underlying uniform's texture", () => {
			const width = 8;
			const height = 34;
			let sut = new Gfx.UnlitTexture();
			let tex = new Gfx.Texture2D(width, height);
			sut.texture = tex;

			assert.deepEqual(sut.uniforms['u_texture'].texture, tex);
		})

		it('should update the version', () => {
			let sut = new Gfx.UnlitTexture();
			assert.deepEqual(sut.version, 0);

			let tex = new Gfx.Texture2D(8, 8);
			sut.texture = tex;
			assert.deepEqual(sut.version, 1);
		})
	})
});
