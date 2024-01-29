import { AttrPointerOptions, Gl } from "../types"

export function createBuffer(gl: Gl) {
  const buffer = gl.createBuffer()
  if (!buffer) throw new Error("Couldn't create buffer")
  return buffer
}

export function bindBuffer(gl: Gl, buffer: WebGLBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
}

export function pointBuffer(
  gl: Gl,
  buffer: WebGLBuffer,
  attrLoc: number,
  options: AttrPointerOptions = {}
) {
  gl.enableVertexAttribArray(attrLoc)
  bindBuffer(gl, buffer)
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.vertexAttribPointer(
    attrLoc,
    options.componentSize ?? 2,
    type,
    normalize,
    stride,
    offset
  )
}

export function buildBuffer(
  gl: Gl,
  attrLoc: number,
  options: AttrPointerOptions = {}
) {
  const buffer = createBuffer(gl)
  pointBuffer(gl, buffer, attrLoc, options)
  return buffer
}

// TODO: usage optimization?
export function fillBuffer(gl: Gl, buffer: WebGLBuffer, data: number[]) {
  bindBuffer(gl, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
}
