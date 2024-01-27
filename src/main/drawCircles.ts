import { CircleMaterial } from "../_temp/circle"
import { Vec2, getMousePosition } from "../utils"
import { canvas, gl } from "../loader"

const material = new CircleMaterial(gl)
material.canvasSize = [canvas.width, canvas.height]
material.circleSize = 30
material.color = [0, 1, 0, 1]
material.use()

function draw(position: Vec2) {
  material.position = position
  gl.drawArrays(gl.POINTS, 0, 1)
}

draw([0, 0])

const points: Vec2[] = []

window.onmousemove = (e) => {
  const { x, y } = getMousePosition(canvas, e)
  if (e.buttons == 1) {
    points.push([x, y])
    points.forEach((p) => draw(p))
  }
}

// setInterval(() => {
//   gl.viewport(0, 0, canvas.width, canvas.height)
// }, 1000)

// TODO: use buffers

// TODO: circle shader program
// TODO: rounded rect shader program
// TODO: image with rounded corners shader program
