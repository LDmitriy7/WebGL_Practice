import { ShaderSources } from "../utils"
import { Program } from "./program"
import { Shader } from "./shader"

export class Gl {
  constructor(private base: WebGL2RenderingContext) {}

  get canvas() {
    return this.base.canvas
  }

  drawPoints(count: number) {
    const { base } = this
    base.drawArrays(base.POINTS, 0, count)
  }

  createProgramFromSources(sources: ShaderSources) {
    return createProgramFromSources(this, sources)
  }

  createVertexShader(source: string) {
    const shader = this._createVertexShader()
    shader.compile(source)
    return shader
  }

  createFragmentShader(source: string) {
    const shader = this._createFragmentShader()
    shader.compile(source)
    return shader
  }

  createProgram(vertexShader: Shader, fragmentShader: Shader) {
    const { base } = this
    const program = base.createProgram()
    if (!program) throw new Error("Couldn't create program")
    vertexShader.attachTo(program)
    fragmentShader.attachTo(program)
    base.linkProgram(program)
    const log = base.getProgramInfoLog(program)
    if (log) throw new Error(log)
    return new Program(base, program)
  }

  useProgram(program: WebGLProgram) {
    this.base.useProgram(program)
  }

  private _createVertexShader() {
    return this.createShader(this.base.VERTEX_SHADER)
  }

  private _createFragmentShader() {
    return this.createShader(this.base.FRAGMENT_SHADER)
  }

  private createShader(type: number) {
    const { base } = this
    const shader = base.createShader(type)
    if (!shader) throw new Error("Couldn't create shader")
    return new Shader(base, shader)
  }
}

function createProgramFromSources(gl: Gl, sources: ShaderSources) {
  const vShader = gl.createVertexShader(sources.vertex)
  const fShader = gl.createFragmentShader(sources.fragment)
  const program = gl.createProgram(vShader, fShader)
  program.use()
  return program
}
