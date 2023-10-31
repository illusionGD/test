import {
    cubeFragmentSOurce,
    cubeVertexSource,
    fragmentSource,
    matFragmentSource,
    matVertexSource,
    textureFragmentSource,
    textureVertexSource,
    vertexSource,
} from './shaders/index.js'
import { bindBuffer, initBuffer } from './utils/buffer.js'
import { cubeColor, cubePoints, indices } from './utils/data.js'
import { mat4, mat3, glMatrix, vec3 } from './utils/gl-matrix/index.js'
import { transformMat4 } from './utils/gl-matrix/vec3.js'
import { clearWebglCanvas, mergePoints } from './utils/index.js'
import { initShader, setShaderVariable } from './utils/shader.js'
import { initTextures } from './utils/texture.js'
const canvas = document.getElementById('webglCanvas')
const gl = canvas.getContext('webgl')

// testBuffer()
// testTexture()
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

    const t_mat = mat4.fromTranslation(mat4.create(), [0.0, 1.0, 0.0])
    console.log('🚀 ~ file: index.js:62 ~ t_mat:', t_mat)
    const vertices = new Float32Array(mergePoints(points))
    const size = vertices.BYTES_PER_ELEMENT

    initShader(gl, matVertexSource, matFragmentSource)
    const u_viewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix4')
    gl.uniformMatrix4fv(u_viewMatrix, false, t_mat)
    bindBuffer(gl, vertices)

    initBuffer(gl, 'a_position', 3, points[0].length * size, 0)
    initBuffer(gl, 'a_uv', 2, points[0].length * size, 3 * size)
    initTextures(gl, 'u_sampler', './images/img2.jpg', () => {
        clearWebglCanvas(gl)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length)
    })
}
testCube()
function testCube() {
    initShader(gl, cubeVertexSource, cubeFragmentSOurce)
    bindBuffer(gl, cubePoints)
    initBuffer(gl, 'a_position', 3, 3 * cubePoints.BYTES_PER_ELEMENT, 0)

    bindBuffer(gl, cubeColor)
    initBuffer(gl, 'a_color', 3, 3 * cubeColor.BYTES_PER_ELEMENT, 0)

    bindBuffer(gl, indices, gl.ELEMENT_ARRAY_BUFFER)

    const projectionMatrixLocation = gl.getUniformLocation(
        gl.program,
        'u_projectMatrix'
    )
    const viewMatrixLocation = gl.getUniformLocation(gl.program, 'u_viewMatrix')
    const modelMatrixLocation = gl.getUniformLocation(
        gl.program,
        'u_moduleMatrix'
    )
    let angle = 1.0

    animation()
    function animation() {
        window.requestAnimationFrame((time) => {
            animation()
            const projectionMatrix = mat4.create()
            mat4.perspective(
                projectionMatrix,
                Math.PI / 4,
                canvas.width / canvas.height,
                0.1,
                100.0
            )
            gl.uniformMatrix4fv(
                projectionMatrixLocation,
                false,
                projectionMatrix
            )

            const viewMatrix = mat4.create()
            angle += 0.01
            mat4.lookAt(viewMatrix, [0, 0, 5], [0.0, 0.0, 0.0], [0, 1, 0])
            gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix)

            const modelMatrix = mat4.create()
            gl.uniformMatrix4fv(
                modelMatrixLocation,
                false,
                mat4.rotate(modelMatrix, modelMatrix, angle, [0.0, 1.0, 1.0])
            )

            clearWebglCanvas(gl)
            for (let i = 0; i < cubePoints.length / 3; i++) {
                gl.drawArrays(gl.TRIANGLES, i, 3)
            }
        })
    }
}
