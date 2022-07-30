import {
    onMounted,
    onBeforeUnmount
} from "vue";

/**
 * @description: 获取鼠标点击坐标
 * @param {*} hitDom 点击的dom
 * @param {*} callback 回调
 * @return {*}
 */
export function useMouseClickPosition(hitDom, callback) {
    const hitArea = hitDom ? hitDom : window
    onMounted(() => {
        hitArea.addEventListener('click', (e) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            callback(x, y)
        })
    })

    onBeforeUnmount(() => {
        hitArea.removeEventListener('click', () => {})
    })
}

/**
 * @description: 获取鼠标双击点击坐标
 * @param {*} hitDom 点击的dom
 * @param {*} callback 回调
 * @return {*}
 */
export function useMouseDoubleClick(hitDom, callback) {
    const hitArea = hitDom ? hitDom : window
    onMounted(() => {
        hitArea.addEventListener('dblclick', (e) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            callback(x, y)
        })
    })

    onBeforeUnmount(() => {
        hitArea.removeEventListener('click')
    })
}