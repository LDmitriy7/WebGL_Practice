import { ShaderSources } from "../utils"

const vSource = `
uniform vec2 u_resolution;
uniform vec2 u_position;
uniform float u_circleSize;

void main() {
  vec2 resolution = u_resolution;
  if (resolution == vec2(0)) resolution = vec2(1);
  vec2 position = u_position / (resolution / 2.0);
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = u_circleSize * 1.2;
}
`

const fSource = `
precision highp float;

uniform vec4 u_color;
uniform vec2 u_position;
uniform float u_circleSize;
uniform vec2 u_resolution;

void main()
{
  vec2 vertexCoord = u_position + (u_resolution / 2.0);
  vec2 fragDelta = gl_FragCoord.xy - vertexCoord;
  float dist = length(fragDelta);
  float radius = u_circleSize / 2.0;
  float a =  1.0 - clamp(dist - radius, 0.0, 1.0);
  gl_FragColor = vec4(u_color.xyz, u_color.a * a);
}
`

export const circleShaderSources = new ShaderSources(vSource, fSource)
