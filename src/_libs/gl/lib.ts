type Gl = WebGL2RenderingContext

export function drawPoints(gl: Gl, count: number) {
  gl.drawArrays(gl.POINTS, 0, count)
}

export function drawTriangles(gl: Gl, vertexCount: number) {
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
}

export function buildVertexShader(gl: Gl, source: string) {
  return buildShader(gl, gl.VERTEX_SHADER, source)
}

export function buildFragmentShader(gl: Gl, source: string) {
  return buildShader(gl, gl.FRAGMENT_SHADER, source)
}

export function buildShader(gl: Gl, type: number, source: string) {
  const shader = createShader(gl, type)
  compileShader(gl, shader, source)
  return shader
}

export function createShader(gl: Gl, type: number) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error(`Couldn't create ${type} shader`)
  return shader
}

export function compileShader(gl: Gl, shader: WebGLShader, source: string) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const log = gl.getShaderInfoLog(shader)
  if (log) throw new Error(log)
}

export function buildProgram(
  gl: Gl,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = createProgram(gl)
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const log = gl.getProgramInfoLog(program)
  if (log) throw new Error(log)
  gl.useProgram(program)
  return program
}

export function createProgram(gl: Gl) {
  const program = gl.createProgram()
  if (!program) throw new Error("Couldn't create program")
  return program
}

export type ShaderSources = {
  vertex: string
  fragment: string
}

export function buildProgramFromSources(gl: Gl, sources: ShaderSources) {
  const vShader = buildVertexShader(gl, sources.vertex)
  const fShader = buildFragmentShader(gl, sources.fragment)
  const program = buildProgram(gl, vShader, fShader)
  return program
}

export function getResolution(gl: Gl) {
  const canvas = gl.canvas
  return [canvas.width, canvas.height] as const
}
