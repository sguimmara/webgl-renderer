import BaseObject from "./BaseObject.mjs";

export default class Node extends BaseObject {
	constructor(material, mesh) {
		super()
		this.material = material;
		this.mesh = mesh;
	}
}
