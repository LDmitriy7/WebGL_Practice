import { _gl as _gl, canvas } from "../loader"
import { pointShaderSources } from "../shaderSources"
import { Gl } from "../gl"
import { elapse } from "./lib"

const gl = new Gl(_gl)
const program = gl.createProgramFromSources(pointShaderSources)

program.setUniformVec2("u_resolution", [canvas.width, canvas.height])
program.setUniform("u_pointSize", 10)
program.setUniformVec4("u_color", [1, 1, 1, 1])

elapse(() => program.getUniformLocation("u_color"), 1_000_000)
gl.drawPoints(1)
