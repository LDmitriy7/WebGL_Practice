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
  // TODO: cache
  const loc = gl.getUniformLocation(program, key)
  if (!loc) throw new Error(`Uniform ${key} not found`)
  return loc
}

export type Vec2 = [number, number]
export type Vec4 = [number, number, number, number]

export class ShaderProgram {
  private program: WebGLProgram

  constructor(protected gl: GL, shaderSources: ShaderSources) {
    this.program = createShaderProgram(gl, shaderSources)
    this.use()
  }

  use() {
    this.gl.useProgram(this.program)
  }

  getUniformLocation(key: string) {
    return getUniformLocation(this.gl, this.program, key)
  }

  setUniform(key: string, value: number) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform1f(loc, value)
  }

  setUniformVec2(key: string, values: Vec2) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform2f(loc, ...values)
  }

  setUniformVec4(key: string, values: Vec4) {
    const loc = this.getUniformLocation(key)
    this.gl.uniform4f(loc, ...values)
  }
}

export function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  return {
    x: e.clientX - canvas.offsetLeft - canvas.width / 2,
    y: -e.clientY + canvas.offsetTop + canvas.height / 2,
  }
}
