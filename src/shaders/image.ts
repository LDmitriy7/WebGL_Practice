import { GL, Shader, ShaderSources } from "../utils"

const vSource = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;

uniform vec2 u_canvasSize;
out vec2 v_texCoord;

void main() {
  vec2 position = a_position / (u_canvasSize / 2.0);
  gl_Position = vec4(position, 0, 1);
  v_texCoord = a_texCoord;
}
`

const fSource = `#version 300 es
precision highp float;

uniform sampler2D u_image;
in vec2 v_texCoord;
out vec4 outColor;

void main() {
  outColor = texture(u_image, v_texCoord);
}
`

const sources = new ShaderSources(vSource, fSource)

export class ImageShaderProgram extends Shader {
  static get(gl: GL) {
    return this._get(gl, ImageShaderProgram, sources)
  }

  constructor(gl: GL) {
    super(gl, sources)
    this.init()
  }

  private init() {
    const { _gl: gl } = this
    this.setCanvasSize("u_canvasSize")
    this.createBuffer("a_texCoord")
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    )
    this.createTexture()
    this.createBuffer("a_position")
  }

  setPositions(gl: GL, x: number, y: number, width: number, height: number) {
    var x1 = x - width / 2
    var x2 = x1 + width
    var y1 = y - height / 2
    var y2 = y1 + height
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      gl.STATIC_DRAW
    )
  }

  draw(image: HTMLImageElement) {
    this.setTextureData(image)
    this.setPositions(this._gl, 0, 0, image.width, image.height)
    this.drawTriangles(6)
  }
}
