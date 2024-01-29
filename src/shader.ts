import { Gl, ShaderSource } from "../modules/gl-manager/types"
import "./loader"
import { getAttrLoc, getUniformLoc } from "../modules/gl-manager/lib"

const vSource = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat3 uProjectionMatrix;
varying vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4((uProjectionMatrix * vec3(aVertexPosition, 1)).xy, 0, 1);
  gl_PointSize = 100.0;
  vTextureCoord = aTextureCoord;
}
`

const fSource = `
precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`
// TODO: use glm?
function getLocs(gl: Gl, program: WebGLProgram) {
  const u = (name: string) => getUniformLoc(gl, program, name)
  const a = (name: string) => getAttrLoc(gl, program, name)
  return {
    sampler: u("uSampler"),
    projectionMatrix: u("uProjectionMatrix"),
    textureCoord: a("aTextureCoord"),
    vertexPosition: a("aVertexPosition"),
  }
}

export const shaderSource = {
  vertex: vSource,
  fragment: fSource,
  getLocs,
}
