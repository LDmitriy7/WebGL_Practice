import { PointShader } from "../shaders/point"
import { Vec4, Vec2, GL } from "../utils"

export class PointMaterial {
  pointSize = 1
  color: Vec4 = [1, 1, 1, 1]
  canvasSize: Vec2 = [2, 2]
  private shader: PointShader
  private _position: Vec2 = [0, 0]

  constructor(gl: GL) {
    this.shader = PointShader.get(gl)
  }

  public get position(): Vec2 {
    return this._position
  }
  public set position(value: Vec2) {
    this._position = value
    this.shader.position = value
  }

  use() {
    const { shader } = this
    shader.use()
    shader.pointSize = this.pointSize
    shader.color = this.color
    shader.canvasSize = this.canvasSize
  }
}
