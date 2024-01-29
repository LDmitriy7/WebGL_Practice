import { mat3 } from "gl-matrix"
import shaderSources from "../_libs/shaderSources2"
import { Vec2 } from "../_libs/gl/lib"
import { Gl } from "../_libs/gl"
import { _gl } from "../loader"
import { toRadians } from "../utils"

const gl = new Gl(_gl)
const shaderSource = shaderSources.transform
const program = gl.buildProgramFromSources(shaderSource)
const locs = shaderSource.getLocations(gl.gl, program)
const positionBuffer = gl.buildBuffer(locs.position, 2)

gl.setUniformVec4(locs.color, [1, 1, 1, 1])

const translation: Vec2 = [500, 500]
const rotation = 0
const scale: Vec2 = [1, 1]
const positions: Vec2[] = createRectPositions(100, 200)

function createRectPositions(width: number, height: number): Vec2[] {
  const x1 = width / 2
  const y1 = height / 2
  const x2 = -x1
  const y2 = -y1
  return [
    [x1, y1],
    [x2, y1],
    [x2, y2],
    [x1, y1],
    [x1, y2],
    [x2, y2],
  ]
}

function draw() {
  // TODO: pivot
  const mat = mat3.create()
  mat3.projection(mat, ...gl.resolution)
  mat3.translate(mat, mat, translation)
  mat3.rotate(mat, mat, toRadians(rotation))
  mat3.scale(mat, mat, scale)
  gl.setUniformMat3(locs.transform, mat)
  gl.fillBuffer(positionBuffer, positions.flat())
  gl.drawTriangles(positions.length)
  // gl.drawPoints(positions.length)
}

draw()
