import { AttrPointerOptions, Gl, ShaderSource, Vec2, Vec4 } from "./types"
import * as lib from "./lib"

export class GlManager {
  constructor(public gl: Gl) {}

  get canvas() {
    return this.gl.canvas
  }

  get resolution() {
    return lib.getResolution(this.gl)
  }

  getUniformLoc(program: WebGLProgram, name: string) {
    return lib.getUniformLoc(this.gl, program, name)
  }

  getAttrLoc(program: WebGLProgram, name: string) {
    return lib.getAttrLoc(this.gl, program, name)
  }

  drawPoints(count: number) {
    lib.drawPoints(this.gl, count)
  }

  drawTriangles(vertexCount: number) {
    lib.drawTriangles(this.gl, vertexCount)
  }

  buildProgram(source: ShaderSource) {
    return lib.buildProgramFromSource(this.gl, source)
  }

  setUniform(loc: WebGLUniformLocation, value: number) {
    lib.setUniform(this.gl, loc, value)
  }

  setUniformInt(loc: WebGLUniformLocation, value: number) {
    lib.setUniformInt(this.gl, loc, value)
  }

  setUniformVec4(loc: WebGLUniformLocation, value: Vec4) {
    lib.setUniformVec4(this.gl, loc, value)
  }

  setUniformMat3(loc: WebGLUniformLocation, value: Float32List) {
    lib.setUniformMat3(this.gl, loc, value)
  }

  setUniformVec2(loc: WebGLUniformLocation, value: Vec2) {
    lib.setUniformVec2(this.gl, loc, value)
  }

  setResolution(loc: WebGLUniformLocation) {
    lib.setResolution(this.gl, loc)
  }

  buildBuffer(attrLoc: number, options?: AttrPointerOptions) {
    return lib.buildBuffer(this.gl, attrLoc, options)
  }

  fillBuffer(buffer: WebGLBuffer, data: number[]) {
    lib.fillBuffer(this.gl, buffer, data)
  }
}
