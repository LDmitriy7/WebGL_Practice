import {
  ShaderSources,
  Vec2,
  Vec4,
  bindBuffer,
  buildBuffer,
  buildFragmentShader,
  buildProgram,
  buildProgramFromSources,
  buildShader,
  buildVertexShader,
  compileShader,
  createBuffer,
  createProgram,
  createShader,
  drawPoints,
  drawTriangles,
  fillBuffer,
  getAttrLocation,
  getResolution,
  getUniformLocation,
  setAttrPointer,
  setUniform,
  setUniformInt,
  setUniformMat3,
  setUniformVec2,
  setUniformVec4,
} from "./lib"

export class Gl {
  constructor(public gl: WebGL2RenderingContext) {}

  get canvas() {
    return this.gl.canvas
  }

  get resolution() {
    return getResolution(this.gl)
  }

  getUniformLocation(program: WebGLProgram, name: string) {
    return getUniformLocation(this.gl, program, name)
  }

  getAttrLocation(program: WebGLProgram, name: string) {
    return getAttrLocation(this.gl, program, name)
  }

  drawPoints(count: number) {
    drawPoints(this.gl, count)
  }

  drawTriangles(vertexCount: number) {
    drawTriangles(this.gl, vertexCount)
  }

  buildVertexShader(source: string) {
    return buildVertexShader(this.gl, source)
  }

  buildFragmentShader(source: string) {
    return buildFragmentShader(this.gl, source)
  }

  buildShader(type: number, source: string) {
    return buildShader(this.gl, type, source)
  }

  createShader(type: number) {
    return createShader(this.gl, type)
  }

  compileShader(shader: WebGLShader, source: string) {
    return compileShader(this.gl, shader, source)
  }

  buildProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    return buildProgram(this.gl, vertexShader, fragmentShader)
  }

  createProgram() {
    return createProgram(this.gl)
  }

  buildProgramFromSources(sources: ShaderSources) {
    return buildProgramFromSources(this.gl, sources)
  }

  setUniform(loc: WebGLUniformLocation, value: number) {
    setUniform(this.gl, loc, value)
  }

  setUniformInt(loc: WebGLUniformLocation, value: number) {
    setUniformInt(this.gl, loc, value)
  }

  setUniformVec4(loc: WebGLUniformLocation, value: Vec4) {
    setUniformVec4(this.gl, loc, value)
  }

  setUniformMat3(loc: WebGLUniformLocation, value: Float32List) {
    setUniformMat3(this.gl, loc, value)
  }

  setUniformVec2(loc: WebGLUniformLocation, value: Vec2) {
    setUniformVec2(this.gl, loc, value)
  }

  setResolution(loc: WebGLUniformLocation) {
    this.setUniformVec2(loc, this.resolution)
  }

  createBuffer() {
    return createBuffer(this.gl)
  }

  bindBuffer(buffer: WebGLBuffer) {
    bindBuffer(this.gl, buffer)
  }

  setAttrPointer(loc: number, buffer: WebGLBuffer, componentSize?: number) {
    return setAttrPointer(this.gl, loc, buffer, componentSize)
  }

  buildBuffer(loc: number, componentSize?: number) {
    return buildBuffer(this.gl, loc, componentSize)
  }

  fillBuffer(buffer: WebGLBuffer, data: number[]) {
    fillBuffer(this.gl, buffer, data)
  }
}
