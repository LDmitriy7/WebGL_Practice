import { Gl, ShaderSource } from "../types"
import { buildFragmentShader, buildVertexShader } from "./shader"

export function createProgram(gl: Gl) {
  const program = gl.createProgram()
  if (!program) throw new Error("Couldn't create program")
  return program
}

export function initProgram(
  gl: Gl,
  program: WebGLProgram,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const log = gl.getProgramInfoLog(program)
  if (log) throw new Error(log)
  gl.useProgram(program)
}

export function buildProgram(
  gl: Gl,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = createProgram(gl)
  initProgram(gl, program, vertexShader, fragmentShader)
  return program
}

export function buildProgramFromSource(gl: Gl, source: ShaderSource) {
  const vShader = buildVertexShader(gl, source.vertex)
  const fShader = buildFragmentShader(gl, source.fragment)
  const program = buildProgram(gl, vShader, fShader)
  return program
}
