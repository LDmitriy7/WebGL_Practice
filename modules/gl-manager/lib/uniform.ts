import { Gl, Vec2, Vec4 } from "../types"

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
