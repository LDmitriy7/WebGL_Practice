import { createCanvas, getGl } from "./utils"

const canvas = createCanvas()
const gl = getGl(canvas)

gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
gl.enable(gl.BLEND)

export { canvas, gl }
