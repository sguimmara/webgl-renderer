import Rgba from "../math/Rgba";
import Uniform from "./Uniform";

export default class RgbaUniform extends Uniform {
    constructor(location) {
        super(location, Rgba.BLACK, '4f')
    }
}