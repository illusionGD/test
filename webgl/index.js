import { fragmentSource, vertexSource } from './shaders/index.js'
import { clearWebglCanvas, drawWebglCanvas } from './utils/index.js'
import { initShader } from './utils/initShader.js'
const canvas = document.getElementById('webglCanvas')
const gl = canvas.getContext('webgl')

initShader(gl, vertexSource, fragmentSource)

clearWebglCanvas(gl)

drawWebglCanvas(gl)
