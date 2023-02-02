import {
    onBeforeUnmount
} from "vue";

/**
 * @description: 绑定window相关事件，在组件卸载时取消绑定
 * @param {string} type 事件类型
 * @return {*}
 */
export function bindWindowEvent(type: keyof WindowEventMap, fun: any) {
    window.addEventListener(type, fun);
    onBeforeUnmount(() => {
        window.removeEventListener(type, fun)
    })
}