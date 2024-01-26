export type GL = WebGL2RenderingContext

export function getGl(canvas: HTMLCanvasElement): GL {
  const gl = canvas.getContext("webgl2")
  const msg = "WebGL2 is not supported"
  if (!gl) {
    alert(msg)
    throw new Error(msg)
  }
  return gl
}

export function createCanvas() {
  const canvas = document.createElement("canvas")
  document.body.appendChild(canvas)
  canvas.width = 1280
  canvas.height = 720
  return canvas
}

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

function setUniform(gl: GL, program: WebGLProgram, key: string, value: number) {
  const loc = getUniformLocation(gl, program, key)
  gl.uniform1f(loc, value)
}

function getUniformLocation(gl: GL, program: WebGLProgram, key: string) {
  const loc = gl.getUniformLocation(program, key)
  if (!loc) throw new Error(`Uniform ${key} not found`)
  return loc
}

function getAttrLocation(gl: GL, program: WebGLProgram, key: string) {
  const loc = gl.getAttribLocation(program, key)
  if (loc == null) throw new Error(`Attribute ${key} not found`)
  return loc
}

export type Vec2 = [number, number]
export type Vec4 = [number, number, number, number]

export class ShaderProgram {
  program: WebGLProgram // TODO: private

  constructor(protected gl: GL, shaderSources: ShaderSources) {
    this.program = createShaderProgram(gl, shaderSources)
    this.use()
  }

  use() {
    this.gl.useProgram(this.program)
  }

  // TODO: cache
  getUniformLocation(key: string) {
    return getUniformLocation(this.gl, this.program, key)
  }

  // TODO: cache
  getAttrLocation(key: string) {
    return getAttrLocation(this.gl, this.program, key)
  }

  setUniform(key: string, value: number) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform1f(loc, value)
  }

  setUniformInt(key: string, value: number) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform1i(loc, value)
  }

  setUniformVec2(key: string, values: Vec2) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform2f(loc, ...values)
  }

  setCanvasSize(key: string) {
    const canvas = this.gl.canvas
    this.setUniformVec2(key, [canvas.width, canvas.height])
  }

  setUniformVec4(key: string, values: Vec4) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform4f(loc, ...values)
  }

  enableVertexAttribArray(key: string) {
    const loc = this.getAttrLocation(key)
    this.gl.enableVertexAttribArray(loc)
  }

  createTexture() {
    const { gl } = this
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    return texture
  }

  drawTriangles(vertexCount: number) {
    const { gl } = this
    const primitiveType = gl.TRIANGLES
    const offset = 0
    gl.drawArrays(primitiveType, offset, vertexCount)
  }

  setTextureData(image: HTMLImageElement) {
    const { gl } = this
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
    const { gl } = this
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
    const { gl } = this
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  }

  _createBuffer() {
    const buffer = this.gl.createBuffer()!
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
