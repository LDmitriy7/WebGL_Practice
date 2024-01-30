import { mat3 } from "gl-matrix"
import { Gl, Vec2, Vec4 } from "../modules/gl-manager/types"
import { RECT_COORDS, Shader } from "../modules/shader"
import { drawTriangles, getResolution } from "../modules/gl-manager/lib"
import { expose } from "../modules/global"

const RECT_VERTEX_POSITIONS = RECT_COORDS.map((i) => [i[0] - 0.5, i[1] - 0.5])
const TEXTURE_COORDS = RECT_COORDS

const IMAGES: HTMLImageElement[] = []
expose({ IMAGES })

export class Drawer {
  color: Vec4 = [1, 1, 1, 1]
  translation: Vec2 = [0, 0]
  rotation = 0
  scale: Vec2 = [1, 1]
  shader: Shader
  private projectionMatrix = mat3.create()

  constructor(private gl: Gl) {
    this.shader = new Shader(gl)
  }

  draw(vertexPositions: number[]) {
    const { shader } = this
    shader.vertexPositions = vertexPositions
    const resolution = getResolution(this.gl)
    projectMatrix(
      this.projectionMatrix,
      resolution,
      this.translation,
      this.rotation,
      this.scale
    )
    shader.projectionMatrix = this.projectionMatrix
    shader.color = this.color
    drawTriangles(this.gl, vertexPositions.length / 2)
  }

  drawImage(image: HTMLImageElement, textureOffsetX = 0) {
    let imageIndex = IMAGES.indexOf(image)

    if (imageIndex == -1) {
      imageIndex = IMAGES.length
      this.shader.textureUnit = imageIndex
      this.shader.image = image
      IMAGES.push(image)
    } else {
      this.shader.textureUnit = imageIndex
    }

    const vertexPositions = RECT_VERTEX_POSITIONS.map((i) => [
      i[0] * image.width,
      i[1] * image.height,
    ]).flat()
    this.shader.textureCoords = TEXTURE_COORDS.map((i) => [
      i[0] - textureOffsetX,
      i[1],
    ]).flat()
    this.draw(vertexPositions)
  }

  // _drawImage(textureOffsetX = 0) {
  //   const { image } = this
  //   if (!image) throw new Error("No image")
  //   const vertexPositions = RECT_VERTEX_POSITIONS.map((i) => [
  //     i[0] * image.width,
  //     i[1] * image.height,
  //   ]).flat()
  //   this.shader.textureCoords = TEXTURE_COORDS.map((i) => [
  //     i[0] - textureOffsetX,
  //     i[1],
  //   ]).flat()
  //   this.draw(vertexPositions)
  // }
}

function projectMatrix(
  out: mat3,
  resolution: Vec2,
  translation: Vec2,
  rotation: number,
  scale: Vec2
) {
  mat3.identity(out)
  mat3.scale(out, out, [2 / resolution[0], 2 / resolution[1]])
  mat3.translate(out, out, translation)
  mat3.rotate(out, out, (Math.PI / 180) * -rotation)
  mat3.scale(out, out, scale)
  return out
}
