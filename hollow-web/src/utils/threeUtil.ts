import * as THREE from 'three';

/**
 * @description: 初始化渲染器
 */
export function initRenderer(dom: HTMLElement) {
    const render = new THREE.WebGLRenderer()
    render.setSize(dom.clientWidth, dom.clientHeight)
    render.setPixelRatio(window.devicePixelRatio)
    dom.appendChild(render.domElement)
    return render
}

/**
 * @description: 获取浏览器宽高比
 * @return {*}
 */
export function getWindowRatio() {
    return window.innerWidth / window.innerHeight
}