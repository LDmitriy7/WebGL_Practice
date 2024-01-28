import { Vec2, Vec4 } from "../utils"
import { Gl } from "../gl"
import { Shader } from "./shader"
import { rectShaderSources } from "../shaderSources/rect"

export class RectShader extends Shader {
  static get(gl: Gl) {
    return this._get(gl, RectShader, rectShaderSources)
  }

  set resolution(value: Vec2) {
    this.program.setUniformVec2("u_resolution", value)
  }

  set color(value: Vec4) {
    this.program.setUniformVec4("u_color", value)
  }

  // TODO:
  set position(value: Vec2) {
    this.createBuffer("a_position")
    this.setPositions(...value, 100, 50)
  }

  draw(position: Vec2) {
    this.position = position
    this.program.gl.drawTriangles(6)
  }

  // -- todo

  setPositions(x: number, y: number, width: number, height: number) {
    const gl = this.program.gl.base
    var x1 = x - width / 2
    var x2 = x1 + width
    var y1 = y - height / 2
    var y2 = y1 + height
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      gl.STATIC_DRAW
    )
  }

  createBuffer(key: string) {
    var buffer = this._createBuffer()
    this.setAttrPointer(key, buffer)
    return buffer
  }

  setAttrPointer(key: string, buffer: WebGLBuffer, componentSize?: number) {
    this.enableVertexAttribArray(key)
    this.bindBuffer(buffer)
    this.vertexAttribPointer(key, componentSize)
  }

  vertexAttribPointer(key: string, componentSize?: number) {
    const gl = this.program.gl.base
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    const loc = this.getAttrLocation(key)
    gl.vertexAttribPointer(
      loc,
      componentSize ?? 2,
      type,
      normalize,
      stride,
      offset
    )
  }

  bindBuffer(buffer: WebGLBuffer) {
    const gl = this.program.gl.base
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  }

  _createBuffer() {
    const gl = this.program.gl.base
    const buffer = gl.createBuffer()!
    this.bindBuffer(buffer)
    return buffer
  }

  enableVertexAttribArray(key: string) {
    const gl = this.program.gl.base
    const loc = this.getAttrLocation(key)
    gl.enableVertexAttribArray(loc)
  }

  getAttrLocation(key: string) {
    const gl = this.program.gl.base
    const loc = gl.getAttribLocation(this.program.base, key)
    if (loc == null) throw new Error(`Attribute ${key} not found`)
    return loc
  }
}
