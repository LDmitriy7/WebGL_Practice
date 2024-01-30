import "./loader"
import { mat3 } from "gl-matrix"
import { Vec2 } from "../modules/gl-manager/types"
import { glm } from "./loader"
import { image } from "./texture"
import { RECT_COORDS, Shader } from "../modules/shader"

const size: Vec2 = [240, 180]

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

const shader = new Shader(glm.gl)
const vertexPositions = RECT_COORDS.map((i) => [i[0] - 0.5, i[1] - 0.5])
  .map((i) => [i[0] * size[0], i[1] * size[1]])
  .flat()

shader.vertexPositions = vertexPositions
shader.projectionMatrix = projectionMatrix
shader.textureCoords = shader.textureCoords.map((i) => i * 2)
shader.color = [1, 1, 1, 0.5]

function main() {
  shader.image = image
  glm.drawTriangles(6)
}

image.onload = () => main()
