import sources from "../shaderSources"
import { SolidShaderSource } from "./solid"
import { TransformShaderSources } from "./transform"

const shaderSources = {
  solid: new SolidShaderSource(sources.vertex, sources.solidFragment),
  transform: new TransformShaderSources(
    sources.transformVertex,
    sources.solidFragment
  ),
}

export default shaderSources
