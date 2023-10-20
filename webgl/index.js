import { fragmentSource, vertexSource } from './shaders/index.js'
import { bindBuffer, initBuffer } from './utils/buffer.js'
import { clearWebglCanvas } from './utils/index.js'
import { initShader, setShaderVariable } from './utils/shader.js'
const canvas = document.getElementById('webglCanvas')
const gl = canvas.getContext('webgl')

initShader(gl, vertexSource, fragmentSource)
const vertices = new Float32Array([
    -0.5, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5, 0.0,
    0.0, 0.0, 1.0,
])
const size = vertices.BYTES_PER_ELEMENT

bindBuffer(gl, vertices)

initBuffer(gl, 'a_position', 3, 6 * size, 0)

initBuffer(gl, 'a_color', 3, 6 * size, 3 * size)

// setShaderVariable(
//     gl,
//     'attribute',
//     'a_position',
//     new Float32Array([0.0, 0.0, 0.0, 1.0])
// )
// setShaderVariable(
//     gl,
//     'uniform',
//     'u_color',
//     new Float32Array([0.0, 0.0, 1.0, 1.0])
// )

clearWebglCanvas(gl)
gl.drawArrays(gl.TRIANGLES, 0, 3)
