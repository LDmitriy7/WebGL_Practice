import { Vec4, Vec2 } from "../utils"
import { Gl } from "../gl"
import { RectShader } from "../shaders/rect"

export class RectMaterial {
  color: Vec4 = [1, 1, 1, 1]
  private shader: RectShader

  constructor(gl: Gl) {
    this.shader = RectShader.get(gl)
    this.update()
  }

  draw(position: Vec2) {
    this.shader.draw(position)
  }

  update() {
    const { shader } = this
    shader.use()
    shader.color = this.color
    this.updateResolution()
  }

  private updateResolution() {
    const canvas = this.shader.canvas
    this.shader.resolution = [canvas.width, canvas.height]
  }
}
