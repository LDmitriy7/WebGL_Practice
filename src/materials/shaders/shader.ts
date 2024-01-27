import { ShaderSources } from "../../utils"
import { Program } from "../../gl/program"
import { Gl } from "../../gl"

type ShaderConstructor<T> = {
  instance?: Shader
  new (program: Program): T
}

export class Shader {
  static instance?: Shader

  protected static _get<T extends Shader>(
    gl: Gl,
    shaderClass: ShaderConstructor<T>,
    sources: ShaderSources
  ) {
    const program = gl.createProgramFromSources(sources)
    if (!shaderClass.instance) shaderClass.instance = new shaderClass(program)
    return shaderClass.instance as T
  }

  constructor(protected program: Program) {}

  use() {
    this.program.use()
  }

  get canvas() {
    return this.program.gl.canvas
  }
}
