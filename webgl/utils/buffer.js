/**
 * 初始化buffer
 * @param {*} gl
 * @param {*} attribute vertex变量名
 * @param {*} size attribute变量长度，如：vec4，就=4
 * @param {*} stride 每个点信息的bytes长度，如：1点的信息有5个，5 * 每个bytes
 * @param {*} offset bytes偏移值，第几个bytes开始算attribute的信息
 */
export function initBuffer(gl, attribute, size, stride, offset) {
    // 获取attribute变量
    const vertexAttribute = gl.getAttribLocation(gl.program, attribute)

    gl.vertexAttribPointer(
        vertexAttribute,
        size,
        gl.FLOAT,
        false,
        stride,
        offset
    )
    // 确认
    gl.enableVertexAttribArray(vertexAttribute)
}

/**
 * 绑定buffer
 * @param {*} gl
 * @param {*} vertices buffer数据
 */
export function bindBuffer(gl, vertices, type = gl.ARRAY_BUFFER) {
    // 创建顶点缓冲区
    const vertexBuffer = gl.createBuffer()
    // 绑定buffer
    gl.bindBuffer(type, vertexBuffer)
    // 绑定buffer数据
    gl.bufferData(type, vertices, gl.STATIC_DRAW)
    return vertexBuffer
}
