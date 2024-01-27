type Vec2 = [number, number]
type Vec4 = [number, number, number, number]

export class Program {
  private uniformLocations: Record<string, WebGLUniformLocation> = {}

  // TODO: private
  constructor(private ctx: WebGL2RenderingContext, public base: WebGLProgram) {}

  getUniformLocation(name: string) {
    const { uniformLocations: locs } = this
    if (!locs[name]) {
      const loc = this.ctx.getUniformLocation(this.base, name)
      if (!loc) throw new Error("Uniform location not found: " + name)
      locs[name] = loc
    }
    return locs[name]
  }

  setUniform(name: string, value: number) {
    const { ctx } = this
    const loc = this.getUniformLocation(name)
    ctx.uniform1f(loc, value)
  }

  setUniformVec2(name: string, value: Vec2) {
    const { ctx } = this
    const loc = this.getUniformLocation(name)
    ctx.uniform2f(loc, ...value)
  }

  setUniformVec4(name: string, value: Vec4) {
    const { ctx } = this
    const loc = this.getUniformLocation(name)
    ctx.uniform4f(loc, ...value)
  }

  use() {
    this.ctx.useProgram(this.base)
  }
}
