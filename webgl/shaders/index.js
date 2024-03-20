/**顶点着色器 */
export const vertexSource = /* glsl */ `
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
export const fragmentSource = /* glsl */ `
precision mediump float;
varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`
export const textureVertexSource = /* glsl */ `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;

void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_position, 1.0);
    // gl_PointSize = 10.0;

}
`

export const textureFragmentSource = /* glsl */ `
precision mediump float;
uniform sampler2D u_sampler;
varying vec2 v_uv;

void main() {
    vec4 color = texture2D(u_sampler, v_uv);
    gl_FragColor = color * color;
}
`

export const matVertexSource = /* glsl */ `
attribute vec3 a_position;
attribute vec2 a_uv;
uniform mat4 u_ViewMatrix4;
varying vec2 v_uv;

void main() {
    v_uv = a_uv;
    gl_Position = u_ViewMatrix4 * vec4(a_position, 1.0);
}
`

export const matFragmentSource = /* glsl */ `
precision mediump float;
uniform sampler2D u_sampler;
varying vec2 v_uv;

void main() {
    vec4 color = texture2D(u_sampler, v_uv);
    gl_FragColor = color * color * color;
}
`

export const cubeVertexSource = /* glsl */ `
attribute vec3 a_position;
uniform mat4 u_moduleMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectMatrix;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = u_projectMatrix * u_viewMatrix * u_moduleMatrix * vec4(a_position, 1.0);
    gl_PointSize = 10.0;
}
`

export const cubeFragmentSOurce = /* glsl */ `
precision mediump float;
varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`
