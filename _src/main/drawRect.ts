import { gl } from "../loader"
import { CircleMaterial } from "../materials/circle"
import { RectMaterial } from "../materials/rect"

const material = new RectMaterial(gl)
material.color = [0, 1, 0, 1]

material.update()
material.draw([0, 0])
material.draw([30, 30])
