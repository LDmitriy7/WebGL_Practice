import { Gl, getAttrLocation, getUniformLocation } from "../gl/lib"
import sources from "../shaderSources"

abstract class ShaderSources {
  constructor(public vertex: string, public fragment: string) {}

  abstract getLocations(
    gl: Gl,
    program: WebGLProgram
  ): Record<string, WebGLUniformLocation>
}

class SolidShaderSource extends ShaderSources {
  getLocations(gl: Gl, program: WebGLProgram) {
    const getUniformLoc = (name: string) =>
      getUniformLocation(gl, program, name)
    const getAttrLoc = (name: string) => getAttrLocation(gl, program, name)
    return {
      color: getUniformLoc("u_color"),
      resolution: getUniformLoc("u_resolution"),
      position: getAttrLoc("a_position"),
    }
  }
}

const shaderSources = {
  solid: new SolidShaderSource(sources.vertex, sources.solidFragment),
}

export default shaderSources
