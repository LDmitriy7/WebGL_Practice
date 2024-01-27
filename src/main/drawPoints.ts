import { canvas, gl } from "../loader"
import { PointMaterial } from "../materials/point"

const material = new PointMaterial(gl)
material.pointSize = 30
material.color = [0, 1, 0, 1]

material.update()
material.draw([0, 0])
material.draw([10, 10])
