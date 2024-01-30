import "./loader"
import { glm } from "./loader"
import { Drawer } from "./drawer"
import { elapse } from "../_src/main/lib"

const image = new Image()
image.src = "bg.jpg"

const drawer = new Drawer(glm.gl)
let textureOffset = 0

function draw() {
  drawer.scale = [2, 2]
  drawer.drawImage(image, textureOffset)
  textureOffset += 0.0001
}
function main() {
  requestAnimationFrame(main)
  elapse(draw)
}

image.onload = () => main()
