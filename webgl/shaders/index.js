/**顶点着色器 */
export const vertexSource = `
void main() {
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 10.0;
}
`

/**片源着色器 */
export const fragmentSource = `
void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
`
