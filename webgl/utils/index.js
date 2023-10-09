/**
 * 清除画布
 * @param {*} gl
 * @param {*} vec4
 */
export function clearWebglCanvas(gl, vec4 = [0.0, 0.0, 0.0, 1.0]) {
    gl.clearColor(...vec4)
    gl.clear(gl.COLOR_BUFFER_BIT)
}
