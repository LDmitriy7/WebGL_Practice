import { gl } from "../loader"
import { CircleMaterial } from "../materials/circle"

const material = new CircleMaterial(gl)
material.circleSize = 30
material.color = [0, 1, 0, 1]

material.update()
material.draw([0, 0])
material.draw([30, 30])
