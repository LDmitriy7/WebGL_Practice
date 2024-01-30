import { mat3 } from "gl-matrix"
import { GlManager } from "./gl-manager"
import { ShaderLocs, shaderSource } from "./shaderSource"
import { Gl, Vec2, Vec4 } from "./gl-manager/types"
import { pickTextureUnit } from "./gl-manager/lib"

export const RECT_COORDS: Vec2[] = [
  [0.0, 1.0],
  [1.0, 1.0],
  [0.0, 0.0],
  [0.0, 0.0],
  [1.0, 1.0],
  [1.0, 0.0],
]

type ShaderBuffers = {
  textureCoord: WebGLBuffer
  vertexPosition: WebGLBuffer
}

export class Shader {
  program: WebGLProgram
  private _textureUnit = 0
  private glm: GlManager
  private texture: WebGLTexture
  private locs: ShaderLocs
  private buffers: ShaderBuffers
  private _image?: HTMLImageElement
  private _vertexPositions = RECT_COORDS.flat().map((i) => i - 0.5)
  private _projectionMatrix = mat3.create()
  private _color: Vec4 = [1, 1, 1, 1]
  private _textureCoords = RECT_COORDS.flat()

  constructor(gl: Gl) {
    const glm = new GlManager(gl)
    this.glm = glm
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

  public get textureUnit() {
    return this._textureUnit
  }
  public set textureUnit(value) {
    this._textureUnit = value
    this.updateTextureUnit()
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

  get color(): Vec4 {
    return this._color
  }
  set color(value: Vec4) {
    this._color = value
    this.updateColor()
  }

  private initUniforms() {
    const { locs, glm } = this
    glm.setUniformInt(locs.sampler, this.textureUnit)
    this.updateColor()
    this.updateProjectionMatrix()
  }

  private updateProjectionMatrix() {
    const { locs, glm } = this
    glm.setUniformMat3(locs.projectionMatrix, this.projectionMatrix)
  }

  private updateTextureUnit() {
    const { glm, locs } = this
    // pickTextureUnit(glm.gl, this.textureUnit) // TODO:
    glm.setUniformInt(locs.sampler, this.textureUnit)
  }

  private updateColor() {
    const { locs, glm } = this
    glm.setUniformVec4(locs.color, this.color)
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
