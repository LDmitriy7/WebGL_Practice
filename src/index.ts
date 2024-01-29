import "./loader"
import { mat3 } from "gl-matrix"
import { Vec2 } from "../modules/gl-manager/types"
import { glm } from "./loader"
import { image, setTexture } from "./texture"
import { shaderSource } from "../modules/shaderSource"

const textureUnit = 0
const program = glm.buildProgram(shaderSource)
const locs = shaderSource.getLocs(glm.gl, program)

const textureCoords: Vec2[] = [
  [0.0, 1.0],
  [1.0, 1.0],
  [0.0, 0.0],
  [0.0, 0.0],
  [1.0, 1.0],
  [1.0, 0.0],
]

const size: Vec2 = [240, 180]

const vertexPositions: Vec2[] = [
  [0.0, 1.0],
  [1.0, 1.0],
  [0.0, 0.0],
  [0.0, 0.0],
  [1.0, 1.0],
  [1.0, 0.0],
]
  .map((i) => [i[0] - 0.5, i[1] - 0.5])
  .map((i) => [i[0] * size[0], i[1] * size[1]])

function createProjectionMatrix(
  resolution: Vec2,
  translation: Vec2,
  rotation: number,
  scale: Vec2
) {
  const mat = mat3.create()
  mat3.scale(mat, mat, [2 / resolution[0], 2 / resolution[1]])
  mat3.translate(mat, mat, translation)
  mat3.rotate(mat, mat, (Math.PI / 180) * rotation)
  mat3.scale(mat, mat, scale)
  return mat
}

const projectionMatrix = createProjectionMatrix(
  glm.resolution,
  [0, 0],
  0,
  [1, 1]
)

glm.setUniformInt(locs.sampler, textureUnit)
glm.setUniformMat3(locs.projectionMatrix, projectionMatrix)

const textureBuffer = glm.buildBuffer(locs.textureCoord)
glm.fillBuffer(textureBuffer, textureCoords.flat())
const positionBuffer = glm.buildBuffer(locs.vertexPosition)
glm.fillBuffer(positionBuffer, vertexPositions.flat())

function main() {
  setTexture(image, textureUnit)
  glm.drawTriangles(6)
}

image.onload = () => main()
