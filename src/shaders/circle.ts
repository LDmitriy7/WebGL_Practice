import { GL, Shader, ShaderSources, Vec2, Vec4 } from "../utils"

const vSource = `
uniform vec2 uPosition;
uniform float uCircleSize;
uniform vec2 uCanvasSize;

void main() {
  vec2 position = uPosition / (uCanvasSize * 0.5);
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = uCircleSize * 1.2;
}
`

const fSource = `
precision highp float;

uniform vec4 uColor;
uniform vec2 uPosition;
uniform float uCircleSize;
uniform vec2 uCanvasSize;

void main()
{
  vec2 vertexCoord = uPosition + (uCanvasSize / 2.0);
  vec2 fragDelta = gl_FragCoord.xy - vertexCoord;
  float dist = length(fragDelta);
  float radius = uCircleSize / 2.0;
  float a =  1.0 - clamp(dist - radius, 0.0, 1.0);
  gl_FragColor = vec4(uColor.xyz, uColor.a * a);
}
`

export const sources = new ShaderSources(vSource, fSource)

export class CircleShaderProgram extends Shader {
  static instance?: CircleShaderProgram

  private constructor(gl: GL) {
    super(gl, sources)
  }

  static get(gl: GL) {
    if (!CircleShaderProgram.instance)
      CircleShaderProgram.instance = new CircleShaderProgram(gl)
    return CircleShaderProgram.instance
  }

  set circleSize(value: number) {
    this.setUniform("uCircleSize", value)
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

export class CircleMaterial {
  circleSize = 100
  color: Vec4 = [1, 1, 1, 1]
  canvasSize: Vec2 = [2, 2]
  private program: CircleShaderProgram
  private _position: Vec2 = [0, 0]

  public get position(): Vec2 {
    return this._position
  }
  public set position(value: Vec2) {
    this._position = value
    this.program.position = value
  }

  constructor(gl: GL) {
    this.program = CircleShaderProgram.get(gl)
  }

  use() {
    const { program } = this
    program.use()
    program.circleSize = this.circleSize
    program.color = this.color
    program.canvasSize = this.canvasSize
  }
}
