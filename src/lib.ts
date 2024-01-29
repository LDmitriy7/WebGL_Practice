export function getGl(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2")
  const msg = "WebGL2 is not supported"
  if (!gl) {
    alert(msg)
    throw new Error(msg)
  }
  return gl
}

export function createCanvas() {
  const canvas = document.createElement("canvas")
  document.body.appendChild(canvas)
  canvas.width = 1280
  canvas.height = 720
  return canvas
}
