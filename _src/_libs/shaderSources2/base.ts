import { Gl } from "../gl/lib"

export abstract class ShaderSources {
  constructor(public vertex: string, public fragment: string) {}

  abstract getLocations(
    gl: Gl,
    program: WebGLProgram
  ): Record<string, WebGLUniformLocation>
}
