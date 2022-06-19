import {
    onMounted,
    onBeforeUnmount
} from "vue";

export function useMouseClickPosition(hitDom, fun) {
    const hitArea = hitDom ? hitDom : window
    onMounted(() => {
        hitArea.addEventListener('click', (e) => {
            const x = Number(e.clientX)
            const y = Number(e.clientY)
            fun(x, y)
        })
    })

    onBeforeUnmount(() => {
        hitArea.removeEventListener('click', () => {})
    })
}