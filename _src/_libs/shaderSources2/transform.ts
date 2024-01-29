import { getAttrLocation, getUniformLocation } from "../gl/lib"
import { ShaderSources } from "./base"

export class TransformShaderSources extends ShaderSources {
  getLocations(gl: WebGL2RenderingContext, program: WebGLProgram) {
    const getUniformLoc = (name: string) =>
      getUniformLocation(gl, program, name)
    const getAttrLoc = (name: string) => getAttrLocation(gl, program, name)
    return {
      position: getAttrLoc("a_position"),
      transform: getUniformLoc("u_transform"),
      color: getUniformLoc("u_color"),
    }
  }
}
