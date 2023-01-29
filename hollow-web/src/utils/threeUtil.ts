import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'

/**
 * @description: 初始化渲染器
 */
export function initRenderer(dom: HTMLElement, options?: THREE.WebGLRendererParameters) {
    const render = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
        ...options
    })
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

/**
 * @description: 获取性能监视器
 * @return {*}
 */
export function initStats() {
    const stats = Stats()
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.zIndex = '1'
    stats.domElement.style.top = '0'
    stats.domElement.style.right = '0'
    stats.domElement.style.left = 'unset'
    return stats
}

/**
 * @description: 初始化网格辅助器
 * @return {*}
 */
export function initGridHelper() {
    return new THREE.GridHelper(200, 100, 'rgb(200,200,200)', 'rgb(100,100,100)')
}