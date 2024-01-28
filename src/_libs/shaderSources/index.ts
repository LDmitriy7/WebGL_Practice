class ShaderSources {
  constructor(public vertex: string, public fragment: string) {}
}

const vertexSource = `
uniform vec2 u_resolution;
attribute vec2 a_position;

void main() {
  vec2 position;
  if (u_resolution == vec2(0)) position = a_position;
  else position = a_position / (u_resolution / 2.0);
  gl_Position = vec4(position, 0, 1);
}
`

const solidFragmentSource = `
precision highp float;
uniform vec4 u_color;

void main()
{
  gl_FragColor = u_color;
}
`

const shaderSources = {
  solid: new ShaderSources(vertexSource, solidFragmentSource),
}

export default shaderSources
