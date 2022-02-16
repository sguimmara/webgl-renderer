import { describe, it } from 'mocha';
import assert from 'assert';
import * as Gfx from '../../src/Gfx';

describe('SolidColor', () => {
  function makeSut() {
    return new Gfx.SolidColor();
  }

  describe('set color()', () => {
    it('should update the <color> uniform with the specified value', () => {
      const sut = makeSut();
      sut.color = Gfx.Rgba.RED;
      assert.deepEqual(sut.uniforms.color.value, Gfx.Rgba.RED);
    });

    it('should update the version', () => {
      const sut = makeSut();
      assert.deepEqual(0, sut.version);
      sut.color = Gfx.Rgba.RED;
      assert.deepEqual(1, sut.version);
    });
  });
});
