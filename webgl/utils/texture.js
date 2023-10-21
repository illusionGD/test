export function initTextures(gl, uniform, url, loadCallback) {
    const texture = gl.createTexture()

    // 获取采样
    const u_sampler = gl.getUniformLocation(gl.program, uniform)

    // 创建image对象，用于下载图片
    const img = new Image()

    // 绑定图片响应事件
    img.onload = function () {
        loadTexture(gl, texture, u_sampler, img)
        loadCallback && loadCallback()
    }
    // 加载图片
    img.src = url
}

/**
 * 加载贴图
 * @param {*} gl
 * @param {*} texture 贴图对象
 * @param {*} u_sampler 采样对象
 * @param {*} image 图片对象
 */
export function loadTexture(gl, texture, u_sampler, image) {
    // 反转y轴，因为纹理坐标和图像的坐标差异
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    // 开启0好纹理单元，可以理解成图层，不同系统，可叠加的图层数量不同，window可叠加8层
    gl.activeTexture(gl.TEXTURE0)
    // 绑定纹理
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // 设置纹理参数，https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR) // 对于缩小的图片，采用加权平均
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR) // 对于放大的图片，采用加权平均
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE) // 处理非2的n次方图片
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE) // 处理非2的n次方图片
    // 设置纹理为改图片 https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    // 将纹理传给着色器采样，第0个图层
    gl.uniform1i(u_sampler, 0)
}
