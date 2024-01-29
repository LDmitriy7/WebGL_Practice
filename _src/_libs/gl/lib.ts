export type Gl = WebGL2RenderingContext
export type Vec2 = [number, number]
export type Vec4 = [number, number, number, number]

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

export function getResolution(gl: Gl): Vec2 {
  const canvas = gl.canvas
  return [canvas.width, canvas.height]
}

export function getUniformLocation(
  gl: Gl,
  program: WebGLProgram,
  name: string
) {
  const loc = gl.getUniformLocation(program, name)
  if (!loc) throw new Error(`Uniform ${name} not found`)
  return loc
}

export function getAttrLocation(gl: Gl, program: WebGLProgram, name: string) {
  const loc = gl.getAttribLocation(program, name)
  if (loc == null) throw new Error(`Attribute ${name} not found`)
  return loc
}

export function setUniform(gl: Gl, loc: WebGLUniformLocation, value: number) {
  gl.uniform1f(loc, value)
}

export function setUniformInt(
  gl: Gl,
  loc: WebGLUniformLocation,
  value: number
) {
  gl.uniform1i(loc, value)
}

export function setUniformVec4(gl: Gl, loc: WebGLUniformLocation, value: Vec4) {
  gl.uniform4f(loc, ...value)
}

export function setUniformMat3(
  gl: Gl,
  loc: WebGLUniformLocation,
  value: Float32List
) {
  gl.uniformMatrix3fv(loc, false, value)
}

export function setUniformVec2(gl: Gl, loc: WebGLUniformLocation, value: Vec2) {
  gl.uniform2f(loc, ...value)
}

export function createBuffer(gl: Gl) {
  const buffer = gl.createBuffer()
  if (!buffer) throw new Error("Couldn't create buffer")
  bindBuffer(gl, buffer)
  return buffer
}

export function bindBuffer(gl: Gl, buffer: WebGLBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
}

export function setAttrPointer(
  gl: Gl,
  loc: number,
  buffer: WebGLBuffer,
  componentSize?: number
) {
  gl.enableVertexAttribArray(loc)
  bindBuffer(gl, buffer)
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.vertexAttribPointer(
    loc,
    componentSize ?? 2,
    type,
    normalize,
    stride,
    offset
  )
}

export function buildBuffer(gl: Gl, loc: number, componentSize?: number) {
  const buffer = createBuffer(gl)
  setAttrPointer(gl, loc, buffer, componentSize)
  return buffer
}

export function fillBuffer(gl: Gl, buffer: WebGLBuffer, data: number[]) {
  bindBuffer(gl, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
}
