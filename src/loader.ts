import { createCanvas, getGl } from "./utils"

const canvas = createCanvas()
const gl = getGl(canvas)

gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
gl.enable(gl.BLEND)
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

export { canvas, gl }
