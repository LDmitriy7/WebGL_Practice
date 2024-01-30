import { Gl } from "./gl-manager/types"
import { getAttrLoc, getUniformLoc } from "./gl-manager/lib"

const vSource = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat3 uProjectionMatrix;
varying vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4((uProjectionMatrix * vec3(aVertexPosition, 1)).xy, 0, 1);
  vTextureCoord = aTextureCoord;
}
`

const fSource = `
precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`

export type ShaderLocs = {
  sampler: WebGLUniformLocation
  projectionMatrix: WebGLUniformLocation
  color: WebGLUniformLocation
  textureCoord: number
  vertexPosition: number
}

// TODO: use glm?
function getLocs(gl: Gl, program: WebGLProgram): ShaderLocs {
  const u = (name: string) => getUniformLoc(gl, program, name)
  const a = (name: string) => getAttrLoc(gl, program, name)
  return {
    sampler: u("uSampler"),
    projectionMatrix: u("uProjectionMatrix"),
    color: u("uColor"),
    textureCoord: a("aTextureCoord"),
    vertexPosition: a("aVertexPosition"),
  }
}

export const shaderSource = {
  vertex: vSource,
  fragment: fSource,
  getLocs,
}
