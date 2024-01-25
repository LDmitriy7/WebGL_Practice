import { PointShaderProgram } from "./shaders/point"
import { Vec2, createCanvas, getGl, getMousePosition } from "./utils"

const canvas = createCanvas()
const gl = getGl(canvas)

gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
gl.enable(gl.BLEND)

const program = new PointShaderProgram(gl)
program.pointSize = 200
program.canvasSize = [canvas.width, canvas.height]
program.draw([0, 0])

const points: Vec2[] = []

window.onmousemove = (e) => {
  const { x, y } = getMousePosition(canvas, e)
  if (e.buttons == 1) {
    points.push([x, y])
    points.forEach((p) => program.draw(p))
  }
}

// TODO: use buffers
