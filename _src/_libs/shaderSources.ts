const vertex = `
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform float u_rotation;
uniform vec2 u_scale;

void main() {
  vec2 position = a_position;
  if (u_scale != vec2(0)) position *= u_scale;
  float rotation = -radians(u_rotation - 90.0);
  position = vec2(
    position.x * sin(rotation) + position.y * cos(rotation),
    position.y * sin(rotation) - position.x * cos(rotation)
  );
  position += u_translation;
  if (u_resolution != vec2(0)) position /= (u_resolution / 2.0);
  gl_Position = vec4(position, 0, 1);
}
`

const solidFragment = `
precision highp float;
uniform vec4 u_color;

void main()
{
  gl_FragColor = u_color;
}
`

const transformVertex = `
attribute vec2 a_position;
uniform mat3 u_transform;

void main() {
  vec2 position = (u_transform * vec3(a_position, 1)).xy;
  gl_Position = vec4(position, 0, 1);
  gl_PointSize = 10.0;
}
`

const sources = { vertex, solidFragment, transformVertex }

export default sources
