import {
    fragmentSource,
    textureFragmentSource,
    textureVertexSource,
    vertexSource,
} from './shaders/index.js'
import { bindBuffer, initBuffer } from './utils/buffer.js'
import { clearWebglCanvas, mergePoints } from './utils/index.js'
import { initShader, setShaderVariable } from './utils/shader.js'
import { initTextures } from './utils/texture.js'
const canvas = document.getElementById('webglCanvas')
const gl = canvas.getContext('webgl')

// testBuffer()
testTexture()
function testBuffer() {
    const points = [
        [-0.5, 0.0, 0.0, 1.0, 0.0, 0.0],
        [0.5, 0.0, 0.0, 0.0, 1.0, 0.0],
        [0.5, 0.5, 0.0, 0.0, 0.0, 1.0],
        [-0.5, 0.5, 0.0, 1.0, 1.0, 1.0],
    ]
    /**点的数量 */
    const pointCount = points.length
    /**点大小 */
    const pointSize = points[0].length
    /** 坐标大小 */
    const positionSize = 3
    /** 颜色大小 */
    const colorSize = pointSize - positionSize

    const vertices = new Float32Array(mergePoints(points))

    const size = vertices.BYTES_PER_ELEMENT

    initShader(gl, vertexSource, fragmentSource)

    bindBuffer(gl, vertices)

    initBuffer(gl, 'a_position', positionSize, pointSize * size, 0)

    initBuffer(gl, 'a_color', colorSize, pointSize * size, colorSize * size)
    clearWebglCanvas(gl)
    gl.drawArrays(gl.POINTS, 0, pointCount)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, pointCount)
    gl.drawArrays(gl.LINE_LOOP, 0, pointCount)
}

function testTexture() {
    const points = [
        [-0.5, 0.5, 0.0, 0.0, 1.0],
        [-0.5, -0.5, 0.0, 0.0, 0.0],
        [0.5, 0.5, 0.0, 1.0, 1.0],
        [0.5, -0.5, 0.0, 1.0, 0.0],
    ]
    const vertices = new Float32Array(mergePoints(points))
    const size = vertices.BYTES_PER_ELEMENT

    initShader(gl, textureVertexSource, textureFragmentSource)

    bindBuffer(gl, vertices)

    initBuffer(gl, 'a_position', 3, points[0].length * size, 0)
    initBuffer(gl, 'a_uv', 2, points[0].length * size, 3 * size)
    initTextures(gl, 'u_sampler', './images/img2.jpg', () => {
        clearWebglCanvas(gl)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length)
    })
}
