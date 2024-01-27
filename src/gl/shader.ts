export class Shader {
  constructor(private ctx: WebGL2RenderingContext, private base: WebGLShader) {}

  compile(source: string) {
    const { ctx, base } = this
    ctx.shaderSource(base, source)
    ctx.compileShader(base)
    const log = ctx.getShaderInfoLog(base)
    if (log) throw new Error(log)
  }

  attachTo(program: WebGLProgram) {
    const { ctx, base } = this
    ctx.attachShader(program, base)
  }
}
