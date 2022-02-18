import Colors from "../math/Colors";
import Uniform from "./Uniform";

export default class ColorUniform extends Uniform {
    constructor(location) {
        super(location, Colors.black, '4f')
    }
}
