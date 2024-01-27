import { Gl } from "../gl"
import { canvas, gl as _gl } from "../loader"
import { PointMaterial } from "../materials/point"
import { Vec2, getMousePosition } from "../utils"
import { elapse } from "./lib"

const gl = new Gl(_gl)

const material = new PointMaterial(gl)
material.resolution = [canvas.width, canvas.height]
material.pointSize = 30
material.color = [0, 1, 0, 1]

material.update()
material.draw([0, 0])
material.draw([10, 10])

// elapse(() => material.draw([0, 0]), 1_000_000)

// const points: Vec2[] = []

// window.onmousemove = (e) => {
//   const { x, y } = getMousePosition(canvas, e)
//   if (e.buttons == 1) {
//     points.push([x, y])
//     points.forEach((p) => material.draw(p))
//   }
// }
