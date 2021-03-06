import BaseObject from "../objects/BaseObject.mjs";

export default class MaterialBase extends BaseObject {
	/**
	   * @param {string} programName The name of the program to use.
	   */
	constructor(programName) {
		super()
		this.programName = programName;
		this.version = 0;
		this.uniforms = {}
		this.attributes = {}
	}

	dirty() { this.version += 1; }
}
