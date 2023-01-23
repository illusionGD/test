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
export function useMouseClickPosition(selector: string, callback: Function) {
    let hitArea: HTMLElement;
    onMounted(() => {
        hitArea = document.querySelector(selector) as HTMLElement
        if (!hitArea) {
            return
        }
        hitArea.addEventListener('click', (e: any) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            callback(x, y)
        })
    })

    onBeforeUnmount(() => {
        if (!hitArea) {
            return
        }
        hitArea.removeEventListener('click', () => { })
    })
}

/**
 * @description: 获取鼠标双击点击坐标
 * @param {*} hitDom 点击的dom
 * @param {*} callback 回调
 * @return {*}
 */
export function useMouseDoubleClick(hitDom: Element | undefined, callback: Function) {
    if (!hitDom) {
        return
    }
    const hitArea = hitDom
    onMounted(() => {
        hitArea.addEventListener('dblclick', (e: any) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            callback(x, y)
        })
    })

    onBeforeUnmount(() => {
        hitArea.removeEventListener('click', () => { })
    })
}

export function useMouseEnter(hitDom: Element | undefined, callback: Function) {
    if (!hitDom) {
        return
    }
    const hitArea = hitDom
    onMounted(() => {
        hitArea.addEventListener('mouseenter', (e: any) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            callback(x, y)
        })
    })

    onBeforeUnmount(() => {
        hitArea.removeEventListener('mouseenter', () => { })
    })
}