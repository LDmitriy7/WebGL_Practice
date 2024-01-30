import "./loader"
import { glm } from "./loader"
import { Drawer } from "./drawer"
import { elapse } from "../_src/main/lib"

const image = new Image()
image.src = "bg.jpg"
const image2 = new Image()
image2.src = "leaves.jpg"

const drawer = new Drawer(glm.gl)
drawer.scale = [2, 2]

let textureOffset = 0

function draw() {
  drawer.drawImage(image, textureOffset)
  drawer.drawImage(image2, textureOffset) // !!
  drawer.drawImage(image, textureOffset) // !
  drawer.drawImage(image2, textureOffset)
  textureOffset += 0.0001
}

function main() {
  // requestAnimationFrame(main)
  draw()
  // elapse(draw)
}

image.onload = () => {
  // drawer.image = image
  main()
}

// alert(glm.gl.getParameter(glm.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))

// image

// TODO: float array creation is expensive

// WebGL Inspector?
