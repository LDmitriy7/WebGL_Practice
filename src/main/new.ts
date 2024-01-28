import { Gl } from "../_libs/gl"
import shaderSources from "../_libs/shaderSources"
import { _gl } from "../loader"

const gl = new Gl(_gl)
const program = gl.buildProgramFromSources(shaderSources.solid)

createBuffer("a_position")
setPositions(0, 0, 100, 200)
_gl.uniform4f(_gl.getUniformLocation(program, "u_color"), 1, 0, 0, 1)
_gl.uniform2f(_gl.getUniformLocation(program, "u_resolution"), ...gl.resolution)
gl.drawTriangles(6)
setPositions(300, 0, 100, 200)

gl.drawTriangles(6)

// TODO --

function setPositions(x: number, y: number, width: number, height: number) {
  const gl = _gl
  var x1 = x - width / 2
  var x2 = x1 + width
  var y1 = y - height / 2
  var y2 = y1 + height
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  )
}

function createBuffer(key: string) {
  var buffer = _createBuffer()
  setAttrPointer(key, buffer)
  return buffer
}

function _createBuffer() {
  const gl = _gl
  const buffer = gl.createBuffer()!
  bindBuffer(buffer)
  return buffer
}

function bindBuffer(buffer: WebGLBuffer) {
  const gl = _gl
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
}

function setAttrPointer(
  key: string,
  buffer: WebGLBuffer,
  componentSize?: number
) {
  enableVertexAttribArray(key)
  bindBuffer(buffer)
  vertexAttribPointer(key, componentSize)
}

function vertexAttribPointer(key: string, componentSize?: number) {
  const gl = _gl
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  const loc = getAttrLocation(key)
  gl.vertexAttribPointer(
    loc,
    componentSize ?? 2,
    type,
    normalize,
    stride,
    offset
  )
}

function enableVertexAttribArray(key: string) {
  const gl = _gl
  const loc = getAttrLocation(key)
  gl.enableVertexAttribArray(loc)
}

function getAttrLocation(key: string) {
  const gl = _gl
  const loc = gl.getAttribLocation(program, key)
  if (loc == null) throw new Error(`Attribute ${key} not found`)
  return loc
}
