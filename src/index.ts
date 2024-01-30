import "./loader"
import { mat3 } from "gl-matrix"
import { Gl, Vec2 } from "../modules/gl-manager/types"
import { gl, glm } from "./loader"
import { image } from "./texture"
import { ShaderLocs, shaderSource } from "../modules/shaderSource"
import { GlManager } from "../modules/gl-manager"
import { Vec4 } from "../_src/utils"

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

export const RECT_COORDS: Vec2[] = [
  [0.0, 1.0],
  [1.0, 1.0],
  [0.0, 0.0],
  [0.0, 0.0],
  [1.0, 1.0],
  [1.0, 0.0],
]

class Shader {
  private glm: GlManager
  private _image?: HTMLImageElement | undefined
  private _vertexPositions = RECT_COORDS.flat().map((i) => i - 0.5)
  private _projectionMatrix = mat3.create()
  textureUnit = 0
  color: Vec4 = [1, 1, 1, 1]
  program: WebGLProgram
  texture: WebGLTexture
  locs: ShaderLocs
  buffers: {
    textureCoord: WebGLBuffer
    vertexPosition: WebGLBuffer
  }
  private _textureCoords = RECT_COORDS.flat()

  constructor(gl: Gl) {
    this.glm = new GlManager(gl)
    this.program = glm.buildProgram(shaderSource)
    this.texture = glm.buildTexture()
    const locs = shaderSource.getLocs(gl, this.program)
    this.locs = locs
    this.buffers = {
      textureCoord: glm.buildBuffer(locs.textureCoord),
      vertexPosition: glm.buildBuffer(locs.vertexPosition),
    }
    this.initUniforms()
    this.fillTexture()
    this.fillTextureCoordBuffer()
    this.fillVertexPositionBuffer()
  }

  get image() {
    return this._image
  }
  set image(value) {
    this._image = value
    this.fillTexture()
  }

  get vertexPositions() {
    return this._vertexPositions
  }
  set vertexPositions(value) {
    this._vertexPositions = value
    this.fillVertexPositionBuffer()
  }

  get textureCoords() {
    return this._textureCoords
  }
  set textureCoords(value) {
    this._textureCoords = value
    this.fillTextureCoordBuffer()
  }

  get projectionMatrix() {
    return this._projectionMatrix
  }
  set projectionMatrix(value) {
    this._projectionMatrix = value
    this.updateProjectionMatrix()
  }

  private initUniforms() {
    const { locs, glm } = this
    glm.setUniformVec4(locs.color, this.color)
    glm.setUniformInt(locs.sampler, this.textureUnit)
    this.updateProjectionMatrix()
  }

  private updateProjectionMatrix() {
    const { locs, glm } = this
    glm.setUniformMat3(locs.projectionMatrix, this.projectionMatrix)
  }

  private fillTexture() {
    const { texture, glm } = this
    glm.fillTexture(texture, this.image, this.textureUnit)
  }

  private fillTextureCoordBuffer() {
    const { glm, buffers } = this
    glm.fillBuffer(buffers.textureCoord, this.textureCoords)
  }

  private fillVertexPositionBuffer() {
    const { glm, buffers } = this
    glm.fillBuffer(buffers.vertexPosition, this.vertexPositions)
  }
}

const shader = new Shader(glm.gl)
const vertexPositions = RECT_COORDS.map((i) => [i[0] - 0.5, i[1] - 0.5])
  .map((i) => [i[0] * size[0], i[1] * size[1]])
  .flat()

shader.vertexPositions = vertexPositions
shader.projectionMatrix = projectionMatrix
shader.textureCoords = shader.textureCoords.map((i) => i * 2)

function main() {
  shader.image = image
  glm.drawTriangles(6)
}

image.onload = () => main()
