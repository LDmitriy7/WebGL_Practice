import { Gl } from "./gl"
import { createCanvas, getGl } from "./utils"

const canvas = createCanvas()
const _gl = getGl(canvas)
const gl = new Gl(_gl)

// TODO: to gl manager

_gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA)
_gl.enable(_gl.BLEND)
_gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true)
_gl.clearColor(0, 0, 0, 0)
_gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT)

export { canvas, _gl, gl }
