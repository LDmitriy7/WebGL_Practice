import { pointShaderSources } from "./sources/point"
import { GL, Shader, Vec2, Vec4 } from "../../utils"

export class PointShader extends Shader {
  static instance?: PointShader

  static get(gl: GL) {
    return this._get(gl, PointShader, pointShaderSources)
  }

  set pointSize(value: number) {
    this.setUniform("u_pointSize", value)
  }

  set color(value: Vec4) {
    this.setUniformVec4("u_color", value)
  }

  set position(value: Vec2) {
    this.setUniformVec2("u_position", value)
  }

  set resolution(value: Vec2) {
    this.setUniformVec2("u_resolution", value)
  }
}
