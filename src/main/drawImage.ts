import { _gl } from "../loader"
import { ImageShaderProgram } from "../_temp/image"

const shaderProgram = ImageShaderProgram.get(_gl)
var image = new Image()
image.src = "leaves.jpg"
image.onload = () => shaderProgram.draw(image)

// const textureUnit = 10
// shaderProgram.setUniformInt("u_image", textureUnit)
// gl.activeTexture(gl.TEXTURE0 + textureUnit)
// TODO: use vao
// TODO: create buffer, texture class
