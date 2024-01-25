import { GL, ShaderProgram, ShaderSources, Vec2, Vec4 } from "../utils"

const vSource = `
uniform vec2 uPosition;
uniform float uPointSize;
uniform vec2 uCanvasSize;

void main() {
  vec2 position = uPosition / (uCanvasSize * 0.5);
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = uPointSize * 1.2;
}
`

const fSource = `
precision highp float;

uniform vec4 uColor;
uniform vec2 uPosition;
uniform float uPointSize;
uniform vec2 uCanvasSize;

void main()
{
  vec2 vertexCoord = uPosition + (uCanvasSize / 2.0);
  vec2 fragDelta = gl_FragCoord.xy - vertexCoord;
  float dist = length(fragDelta);
  float radius = uPointSize / 2.0;
  float a =  1.0 - clamp(dist - radius, 0.0, 1.0);
  gl_FragColor = vec4(uColor.xyz, uColor.a * a);
  return;  
}
`

export const sources = new ShaderSources(vSource, fSource)

export class PointShaderProgram extends ShaderProgram {
  private _pointSize = 1
  private _color: Vec4 = [1, 1, 1, 1]

  constructor(gl: GL) {
    super(gl, sources)
    this.color = this._color
    this.canvasSize = [1, 1]
  }

  draw(position: Vec2) {
    this.position = position
    const { gl } = this
    gl.drawArrays(gl.POINTS, 0, 1)
  }

  get pointSize() {
    return this._pointSize
  }
  set pointSize(value: number) {
    this._pointSize = value
    this.setUniform("uPointSize", value)
  }

  get color() {
    return this._color
  }
  set color(value) {
    this._color = value
    this.setUniformVec4("uColor", value)
  }

  set position(value: Vec2) {
    this.setUniformVec2("uPosition", value)
  }

  set canvasSize(value: Vec2) {
    this.setUniformVec2("uCanvasSize", value)
  }
}
