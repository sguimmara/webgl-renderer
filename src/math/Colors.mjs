import Color from "./Color.mjs";

export default class Colors {
	static get clear() { return new Color(0, 0, 0, 0); }
	static get red() { return new Color(1, 0, 0, 1); }
	static get green() { return new Color(0, 1, 0, 1); }
	static get blue() { return new Color(0, 0, 1, 1); }
	static get white() { return new Color(1, 1, 1, 1); }
}
