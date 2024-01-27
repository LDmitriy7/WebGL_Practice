import { Vec2 } from "../utils"
import { canvas, gl } from "../loader"
import { PointMaterial } from "../materials/point"

const material = new PointMaterial(gl)
// material.canvasSize = [canvas.width, canvas.height]
material.pointSize = 30
material.color = [0, 1, 0, 1]
material.use()

function draw(position: Vec2) {
  material.position = position
  gl.drawArrays(gl.POINTS, 0, 1)
}

draw([0, 0])
