import {
  ShaderSources,
  buildFragmentShader,
  buildProgram,
  buildProgramFromSources,
  buildShader,
  buildVertexShader,
  compileShader,
  createProgram,
  createShader,
  drawPoints,
  drawTriangles,
  getResolution,
} from "./lib"

export class Gl {
  constructor(public gl: WebGL2RenderingContext) {}

  get canvas() {
    return this.gl.canvas
  }

  get resolution() {
    return getResolution(this.gl)
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
}
