import { Vec4, Vec2 } from "../utils"
import { Gl } from "../gl"
import { CircleShader } from "../shaders/circle"

export class CircleMaterial {
  circleSize = 100
  color: Vec4 = [1, 1, 1, 1]
  private shader: CircleShader

  constructor(gl: Gl) {
    this.shader = CircleShader.get(gl)
    this.update()
  }

  draw(position: Vec2) {
    this.shader.draw(position)
  }

  update() {
    const { shader } = this
    shader.use()
    shader.circleSize = this.circleSize
    shader.color = this.color
    this.updateResolution()
  }

  private updateResolution() {
    const canvas = this.shader.canvas
    this.shader.resolution = [canvas.width, canvas.height]
  }
}
