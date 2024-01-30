import { Gl, Vec2 } from "../types"
import { setUniformVec2 } from "./uniform"

export function drawPoints(gl: Gl, count: number) {
  gl.drawArrays(gl.POINTS, 0, count)
}

export function drawTriangles(gl: Gl, vertexCount: number) {
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
}

export function getResolution(gl: Gl): Vec2 {
  const canvas = gl.canvas
  return [canvas.width, canvas.height]
}

export function setResolution(gl: Gl, loc: WebGLUniformLocation) {
  setUniformVec2(gl, loc, getResolution(gl))
}

export function getUniformLoc(gl: Gl, program: WebGLProgram, name: string) {
  const loc = gl.getUniformLocation(program, name)
  if (!loc) throw new Error(`Uniform ${name} not found`)
  return loc
}

export function getAttrLoc(gl: Gl, program: WebGLProgram, name: string) {
  const loc = gl.getAttribLocation(program, name)
  if (loc == -1) throw new Error(`Attribute ${name} not found`)
  return loc
}

export * from "./buffer"
export * from "./program"
export * from "./shader"
export * from "./texture"
export * from "./uniform"
