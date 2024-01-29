import { PointShader } from "../shaders/point"
import { Vec4, Vec2 } from "../utils"
import { Gl } from "../gl"

export class PointMaterial {
  pointSize = 1
  color: Vec4 = [1, 1, 1, 1]
  private shader: PointShader

  constructor(gl: Gl) {
    this.shader = PointShader.get(gl)
    this.update()
  }

  draw(position: Vec2) {
    this.shader.draw(position)
  }

  update() {
    const { shader } = this
    shader.use()
    shader.pointSize = this.pointSize
    shader.color = this.color
    this.updateResolution()
  }

  private updateResolution() {
    const canvas = this.shader.canvas
    this.shader.resolution = [canvas.width, canvas.height]
  }
}
