import { Gl, Vec4 } from "../types"

export function createTexture(gl: Gl) {
  const texture = gl.createTexture()
  if (!texture) throw new Error("Couldn't create texture")
  return texture
}

export function bindTexture(gl: Gl, texture: WebGLTexture) {
  gl.bindTexture(gl.TEXTURE_2D, texture)
}

export function pickTextureUnit(gl: Gl, textureUnit?: number) {
  gl.activeTexture(gl.TEXTURE0 + (textureUnit ?? 0))
}

// TODO: ?
export function setTextureParams(gl: Gl, texture: WebGLTexture) {
  bindTexture(gl, texture)
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
}

export function initTexture(gl: Gl, texture: WebGLTexture) {
  setTextureParams(gl, texture)
}

export function buildTexture(gl: Gl) {
  const texture = createTexture(gl)
  initTexture(gl, texture)
  return texture
}

function fillCurrentTexture(gl: Gl, image: HTMLImageElement) {
  const mipLevel = 0
  const srcType = gl.UNSIGNED_BYTE
  const srcFormat = gl.RGBA
  const internalFormat = gl.RGBA
  gl.texImage2D(
    gl.TEXTURE_2D,
    mipLevel,
    internalFormat,
    srcFormat,
    srcType,
    image
  )
  gl.generateMipmap(gl.TEXTURE_2D)
}

function fillCurrentTextureFromColor(gl: Gl, color: Vec4) {
  const mipLevel = 0
  const srcType = gl.UNSIGNED_BYTE
  const srcFormat = gl.RGBA
  const internalFormat = gl.RGBA
  const width = 1
  const height = 1
  const border = 0
  const pixels = new Uint8Array(color.map((i) => i * 255))
  gl.texImage2D(
    gl.TEXTURE_2D,
    mipLevel,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixels
  )
}

export function fillTexture(
  gl: Gl,
  texture: WebGLTexture,
  image?: HTMLImageElement,
  textureUnit?: number
) {
  pickTextureUnit(gl, textureUnit)
  bindTexture(gl, texture) // ?!
  if (image) fillCurrentTexture(gl, image)
  else fillCurrentTextureFromColor(gl, [1, 1, 1, 1])
}
