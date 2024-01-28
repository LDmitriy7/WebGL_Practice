import { ShaderSources } from "../utils"

const vSource = `
uniform vec2 u_resolution;
uniform vec2 u_position;
uniform float u_pointSize;

void main() {
  vec2 resolution = u_resolution;
  if (resolution == vec2(0)) resolution = vec2(1);
  vec2 position = u_position / (resolution / 2.0);
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = u_pointSize;
}
`

const fSource = `
precision highp float;
uniform vec4 u_color;

void main()
{
  gl_FragColor = u_color;
}
`

export const pointShaderSources = new ShaderSources(vSource, fSource)
