import { Gl } from "./gl"
import { Program } from "./gl/program"

export type GL = WebGL2RenderingContext

export function createShader(
  gl: GL,
  type: "vertex" | "fragment",
  source: string
) {
  const typeNum = type == "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
  const shader = gl.createShader(typeNum)
  if (!shader) throw new Error(`Could not create ${type} shader`)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const log = gl.getShaderInfoLog(shader)
  if (log) {
    console.error(`Could not compile ${type} shader`)
    throw new Error(log)
  }
  return shader
}

export function _createShaderProgram(
  gl: GL,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const vShader = createShader(gl, "vertex", vertexShaderSource)
  const fShader = createShader(gl, "fragment", fragmentShaderSource)
  const program = gl.createProgram()
  if (!program) throw new Error(`Could not create shader program`)
  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)
  gl.linkProgram(program)
  const log = gl.getProgramInfoLog(program)
  if (log) {
    console.error(`Could not link shader program`)
    throw new Error(log)
  }
  return program
}

export function createShaderProgram(gl: GL, shaderSources: ShaderSources) {
  return _createShaderProgram(gl, shaderSources.vertex, shaderSources.fragment)
}

export class ShaderSources {
  constructor(public vertex: string, public fragment: string) {}
}

function getAttrLocation(gl: GL, program: WebGLProgram, key: string) {
  const loc = gl.getAttribLocation(program, key)
  if (loc == null) throw new Error(`Attribute ${key} not found`)
  return loc
}

export function toRadians(degrees: number) {
  return (Math.PI / 180) * degrees
}

export type Vec2 = [number, number]
export type Vec4 = [number, number, number, number]

export class Shader {
  static instance?: Shader

  protected static _get<T extends typeof Shader>(
    gl: GL,
    shaderClass: T,
    shaderSources: ShaderSources
  ) {
    if (!shaderClass.instance)
      shaderClass.instance = new shaderClass(gl, shaderSources)
    return shaderClass.instance as InstanceType<T>
  }

  _program: WebGLProgram // TODO: private
  gl: Gl
  program: Program

  constructor(protected _gl: GL, shaderSources: ShaderSources) {
    this.gl = new Gl(_gl)
    this.program = this.gl.createProgramFromSources(shaderSources)
    this._program = this.program.base
    this.use()
  }

  use() {
    this.program.use()
  }

  // TODO: cache
  getAttrLocation(key: string) {
    return getAttrLocation(this._gl, this._program, key)
  }

  setUniform(name: string, value: number) {
    this.program.setUniform(name, value)
  }

  setUniformInt(name: string, value: number) {
    this.program.setUniformInt(name, value)
  }

  setUniformVec2(name: string, values: Vec2) {
    this.program.setUniformVec2(name, values)
  }

  setUniformVec4(name: string, values: Vec4) {
    this.program.setUniformVec4(name, values)
  }

  setCanvasSize(name: string) {
    const canvas = this._gl.canvas
    this.setUniformVec2(name, [canvas.width, canvas.height])
  }

  enableVertexAttribArray(key: string) {
    const loc = this.getAttrLocation(key)
    this._gl.enableVertexAttribArray(loc)
  }

  createTexture() {
    const { _gl: gl } = this
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    return texture
  }

  drawTriangles(vertexCount: number) {
    const { _gl: gl } = this
    const primitiveType = gl.TRIANGLES
    const offset = 0
    gl.drawArrays(primitiveType, offset, vertexCount)
  }

  setTextureData(image: HTMLImageElement) {
    const { _gl: gl } = this
    const mipLevel = 0
    const srcFormat = gl.RGBA
    const internalFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    gl.texImage2D(
      gl.TEXTURE_2D,
      mipLevel,
      internalFormat,
      srcFormat,
      srcType,
      image
    )
  }

  vertexAttribPointer(key: string, componentSize?: number) {
    const { _gl: gl } = this
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
    const { _gl: gl } = this
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  }

  _createBuffer() {
    const buffer = this._gl.createBuffer()!
    this.bindBuffer(buffer)
    return buffer
  }

  setAttrPointer(key: string, buffer: WebGLBuffer, componentSize?: number) {
    this.enableVertexAttribArray(key)
    this.bindBuffer(buffer)
    this.vertexAttribPointer(key, componentSize)
  }

  // TODO: buffer class with pointer updates

  createBuffer(key: string) {
    var buffer = this._createBuffer()
    this.setAttrPointer(key, buffer)
    return buffer
  }
}

export function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  return {
    x: e.clientX - canvas.offsetLeft - canvas.width / 2,
    y: -e.clientY + canvas.offsetTop + canvas.height / 2,
  }
}
