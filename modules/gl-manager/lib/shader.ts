import { Gl } from "../types"

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

export function initShader(gl: Gl, shader: WebGLShader, source: string) {
  compileShader(gl, shader, source)
  return shader
}

export function buildShader(gl: Gl, type: number, source: string) {
  const shader = createShader(gl, type)
  initShader(gl, shader, source)
  return shader
}

export function buildVertexShader(gl: Gl, source: string) {
  return buildShader(gl, gl.VERTEX_SHADER, source)
}

export function buildFragmentShader(gl: Gl, source: string) {
  return buildShader(gl, gl.FRAGMENT_SHADER, source)
}

