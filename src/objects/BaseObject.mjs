import { v4 as uuidv4 } from 'uuid';

export default class BaseObject {
	constructor() {
		this.uuid = uuidv4();
	}
}
