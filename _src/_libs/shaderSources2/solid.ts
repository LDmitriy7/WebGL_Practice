import { Gl, getAttrLocation, getUniformLocation } from "../gl/lib"
import { ShaderSources } from "./base"

export class SolidShaderSource extends ShaderSources {
  getLocations(gl: Gl, program: WebGLProgram) {
    const getUniformLoc = (name: string) =>
      getUniformLocation(gl, program, name)
    const getAttrLoc = (name: string) => getAttrLocation(gl, program, name)
    return {
      color: getUniformLoc("u_color"),
      resolution: getUniformLoc("u_resolution"),
      translation: getUniformLoc("u_translation"),
      rotation: getUniformLoc("u_rotation"),
      scale: getUniformLoc("u_scale"),
      position: getAttrLoc("a_position"),
    }
  }
}
