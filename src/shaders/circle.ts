import { Vec2, Vec4 } from "../utils"
import { Gl } from "../gl"
import { Shader } from "./shader"
import { circleShaderSources } from "../shaderSources"

export class CircleShader extends Shader {
  static get(gl: Gl) {
    return this._get(gl, CircleShader, circleShaderSources)
  }

  set circleSize(value: number) {
    this.program.setUniform("u_circleSize", value)
  }

  set color(value: Vec4) {
    this.program.setUniformVec4("u_color", value)
  }

  set position(value: Vec2) {
    this.program.setUniformVec2("u_position", value)
  }

  set resolution(value: Vec2) {
    this.program.setUniformVec2("u_resolution", value)
  }

  draw(position: Vec2) {
    this.position = position
    this.program.gl.drawPoints(1)
  }
}
