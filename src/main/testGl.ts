import { gl as _gl, canvas } from "../loader"
import { pointShaderSources } from "../materials/shaders/sources"
import { Gl } from "../gl"

const gl = new Gl(_gl)
const program = gl.createProgramFromSources(pointShaderSources)

program.setUniformVec2("u_resolution", [canvas.width, canvas.height])
program.setUniform("u_pointSize", 10)
program.setUniformVec4("u_color", [1, 1, 1, 1])

function elapse(callback: () => void, times = 1) {
  const time = performance.now()
  while (times > 0) {
    callback()
    times--
  }
  const elapsed = performance.now() - time
  console.log("Elapsed: " + elapsed)
}

elapse(() => program.getUniformLocation("u_color"), 1_000_000)
gl.drawPoints(1)
