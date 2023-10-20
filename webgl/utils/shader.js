/**
 * 初始化shader
 * @param {*} gl
 * @param {*} vertexSource 顶点着色器source
 * @param {*} fragmentSource 片元着色器source
 */
export function initShader(gl, vertexSource, fragmentSource) {
    // 创建shader
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

    createProgram(gl, [vertexShader, fragmentShader])
}

/**
 * 创建shader
 * @param {*} gl
 * @param {*} type
 * @param {*} source
 */
export function createShader(gl, type, source) {
    // 创建shader
    const shader = gl.createShader(type)
    // shader赋值
    gl.shaderSource(shader, source)
    // 编译shader
    gl.compileShader(shader)
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!compiled) {
        const log = gl.getShaderInfoLog(shader)
        throw new Error(log)
    }

    return shader
}

/**
 * 创建program
 * @param {*} gl
 */
export function createProgram(gl, shaderArray = []) {
    const program = gl.createProgram()
    // 绑定shader
    shaderArray.forEach((shader) => {
        gl.attachShader(program, shader)
    })
    // 链接program
    gl.linkProgram(program)
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (!linked) {
        // link失败
        const log = gl.getProgramInfoLog(program)
        gl.deleteProgram(program)
        shaderArray.forEach((shader) => {
            gl.deleteShader(shader)
        })
        throw new Error(log)
    }

    // 使用program
    gl.useProgram(program)

    gl.program = program

    return program
}

/**
 * 设置shader 变量
 * @param {*} type 变量类型
 * @param {*} name 变量名称
 * @param {*} values 值，数值
 */
export function setShaderVariable(gl, type, name, values) {
    if (type === 'attribute') {
        // 获取shader变量
        const variable = gl.getAttribLocation(gl.program, name)
        // 设置变量值
        gl.vertexAttrib4fv(variable, values)
    }

    if (type === 'uniform') {
        const variable = gl.getUniformLocation(gl.program, name)
        gl.uniform4fv(variable, values)
    }
}
