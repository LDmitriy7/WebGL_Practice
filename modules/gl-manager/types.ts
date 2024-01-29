export type Gl = WebGL2RenderingContext
export type Vec2 = [number, number]
export type Vec4 = [number, number, number, number]
export type ShaderSource = { vertex: string; fragment: string }
export type AttrPointerOptions = Partial<{
  componentSize: number
}>
