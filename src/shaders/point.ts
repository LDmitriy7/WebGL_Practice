import { GL, ShaderProgram, ShaderSources, Vec2, Vec4 } from "../utils"

const vSource = `
uniform vec2 uPosition;
uniform float uPointSize;
uniform vec2 uCanvasSize;

void main() {
  vec2 position = uPosition / (uCanvasSize * 0.5);
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = uPointSize;
}
`

const fSource = `
precision highp float;
uniform vec4 uColor;

void main()
{
  gl_FragColor = uColor;
}
`

export const sources = new ShaderSources(vSource, fSource)

export class PointShaderProgram extends ShaderProgram {
  static instance?: PointShaderProgram

  private constructor(gl: GL) {
    super(gl, sources)
  }

  static get(gl: GL) {
    if (!PointShaderProgram.instance)
      PointShaderProgram.instance = new PointShaderProgram(gl)
    return PointShaderProgram.instance
  }

  set pointSize(value: number) {
    this.setUniform("uPointSize", value)
  }

  set color(value: Vec4) {
    this.setUniformVec4("uColor", value)
  }

  set position(value: Vec2) {
    this.setUniformVec2("uPosition", value)
  }

  set canvasSize(value: Vec2) {
    this.setUniformVec2("uCanvasSize", value)
  }
}

export class PointMaterial {
  pointSize = 1
  color: Vec4 = [1, 1, 1, 1]
  canvasSize: Vec2 = [2, 2]
  private program: PointShaderProgram
  private _position: Vec2 = [0, 0]

  public get position(): Vec2 {
    return this._position
  }
  public set position(value: Vec2) {
    this._position = value
    this.program.position = value
  }

  constructor(gl: GL) {
    this.program = PointShaderProgram.get(gl)
  }

  use() {
    const { program } = this
    program.use()
    program.pointSize = this.pointSize
    program.color = this.color
    program.canvasSize = this.canvasSize
  }
}
