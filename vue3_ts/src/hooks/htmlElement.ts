export function useWebkitAnimationIteration(dom: HTMLElement, callback: Function) {
    dom.addEventListener('webkitAnimationIteration', callback)
}