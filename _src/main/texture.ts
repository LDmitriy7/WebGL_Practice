import { mat3 } from "gl-matrix"
import { Vec2, getAttrLocation, getUniformLocation } from "../_libs/gl/lib"
import { Gl } from "../_libs/gl"
import { _gl } from "../loader"
import { toRadians } from "../utils"
import { ShaderSources } from "../_libs/shaderSources2/base"

const vShaderSource = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;
uniform mat3 u_transform;
out vec2 v_texCoord;

void main() {
  vec2 position = (u_transform * vec3(a_position, 1)).xy;
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = 10.0;
  v_texCoord = a_texCoord;
}
`

const fShaderSource = `#version 300 es
precision highp float;
 
uniform sampler2D u_sampler;
in vec2 v_texCoord;
out vec4 outColor;
 
void main() {
  outColor = texture(u_sampler, v_texCoord);
}`

export class TextureShaderSources extends ShaderSources {
  getLocations(gl: WebGL2RenderingContext, program: WebGLProgram) {
    const getUniformLoc = (name: string) =>
      getUniformLocation(gl, program, name)
    const getAttrLoc = (name: string) => getAttrLocation(gl, program, name)
    return {
      position: getAttrLoc("a_position"),
      transform: getUniformLoc("u_transform"),
      textureUnit: getUniformLoc("u_sampler"),
      textureCoord: getAttrLoc("a_texCoord"),
    }
  }
}

const gl = new Gl(_gl)
const shaderSource = new TextureShaderSources(vShaderSource, fShaderSource)
const program = gl.buildProgramFromSources(shaderSource)
const locs = shaderSource.getLocations(gl.gl, program)
const positionBuffer = gl.buildBuffer(locs.position)
const textureBuffer = gl.buildBuffer(locs.textureCoord)
const textureUnit = 0

gl.setUniformInt(locs.textureUnit, textureUnit)

const translation: Vec2 = [500, 500]
const rotation = 0
const scale: Vec2 = [1, 1]
const size: Vec2 = [240 * 3, 180 * 2]
const positions: Vec2[] = createRectPositions(...size)
const textureOffset: Vec2 = [0, 0]

function createRectPositions(width: number, height: number): Vec2[] {
  const x1 = -width / 2
  const y1 = -height / 2
  const x2 = -x1
  const y2 = -y1
  return [
    [x1, y1],
    [x2, y1],
    [x1, y2],
    [x1, y2],
    [x2, y1],
    [x2, y2],
  ]
}

function draw(image: HTMLImageElement) {
  // TODO: pivot
  const mat = mat3.create()
  mat3.projection(mat, ...gl.resolution)
  mat3.translate(mat, mat, translation)
  mat3.rotate(mat, mat, toRadians(rotation))
  mat3.scale(mat, mat, scale)
  gl.setUniformMat3(locs.transform, mat)
  gl.fillBuffer(positionBuffer, positions.flat())

  const texCoords: Vec2[] = [
    [0.0, 1.0],
    [1.0, 1.0],
    [0.0, 0.0],
    [0.0, 0.0],
    [1.0, 1.0],
    [1.0, 0.0],
  ].map((coord) => [
    (coord[0] * size[0]) / image.width - textureOffset[0],
    (coord[1] * size[1]) / image.height - textureOffset[1],
  ])

  gl.fillBuffer(textureBuffer, texCoords.flat())

  setTexture(image)

  gl.drawTriangles(positions.length)
  // gl.drawPoints(positions.length)
}

function setTexture(image: HTMLImageElement) {
  const _gl = gl.gl
  var texture = _gl.createTexture()

  _gl.activeTexture(_gl.TEXTURE0 + textureUnit)
  _gl.bindTexture(_gl.TEXTURE_2D, texture)

  // Upload the image into the texture.
  var mipLevel = 0 // the largest mip
  var internalFormat = _gl.RGBA // format we want in the texture
  var srcFormat = _gl.RGBA // format of data we are supplying
  var srcType = _gl.UNSIGNED_BYTE // type of data we are supplying
  _gl.texImage2D(
    _gl.TEXTURE_2D,
    mipLevel,
    internalFormat,
    srcFormat,
    srcType,
    image
  )

  _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.REPEAT)
  _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.REPEAT)
  _gl.texParameteri(
    _gl.TEXTURE_2D,
    _gl.TEXTURE_MIN_FILTER,
    _gl.LINEAR_MIPMAP_LINEAR
  )
  // _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR)
  _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR)
  _gl.generateMipmap(_gl.TEXTURE_2D)
}

const image = new Image()
image.src = "leaves.jpg"

function main() {
  image.onload = () => loop()
}

function loop() {
  requestAnimationFrame(loop)
  draw(image)
  textureOffset[0] += 0.1 ** 3
}

main()
