/**顶点着色器 */
export const vertexSource = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = vec4(a_position, 1.0);
    gl_PointSize = 10.0;
}
`

/**片源着色器 */
export const fragmentSource = `
precision mediump float;
varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`
