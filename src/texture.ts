import { gl } from "./loader"

export function setTexture(image: HTMLImageElement, textureUnit = 0) {
  var texture = gl.createTexture()

  gl.activeTexture(gl.TEXTURE0 + textureUnit)
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // Upload the image into the texture.
  var mipLevel = 0 // the largest mip
  var internalFormat = gl.RGBA // format we want in the texture
  var srcFormat = gl.RGBA // format of data we are supplying
  var srcType = gl.UNSIGNED_BYTE // type of data we are supplying
  gl.texImage2D(
    gl.TEXTURE_2D,
    mipLevel,
    internalFormat,
    srcFormat,
    srcType,
    image
  )

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR
  )
  // _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.generateMipmap(gl.TEXTURE_2D)
}

export const image = new Image()
image.src = "leaves.jpg"
