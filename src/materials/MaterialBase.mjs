export default class MaterialBase {
  /**
     * @param {string} programName The name of the program to use.
     */
  constructor(programName) {
    this.programName = programName;
    this.version = 0;
    this.uniforms = {}
    this.attributes = {}
  }

  dirty() { this.version += 1; }
}
