import { Gl } from "../_libs/gl"
import shaderSources from "../_libs/shaderSources2"
import { _gl } from "../loader"

const gl = new Gl(_gl)
const shaderSource = shaderSources.solid
const program = gl.buildProgramFromSources(shaderSource)
const locs = shaderSource.getLocations(gl.gl, program)

gl.setResolution(locs.resolution)
gl.setUniformVec4(locs.color, [1, 0, 0, 1])

const positionBuffer = gl.buildBuffer(locs.position)
setRectPositions(0, 0, 100, 200)
gl.drawTriangles(6)
setRectPositions(300, 0, 100, 200)
gl.drawTriangles(6)

function setRectPositions(x: number, y: number, width: number, height: number) {
  const x1 = x - width / 2
  const x2 = x1 + width
  const y1 = y - height / 2
  const y2 = y1 + height
  const data = [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]
  gl.fillBuffer(positionBuffer, data)
}
