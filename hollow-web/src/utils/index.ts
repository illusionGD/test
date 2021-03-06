import { interValTimer_type } from "../types/common"

/**
 * @description: 循环调用计时器
 * @param {Function} fn
 * @param {number} time
 * @return {*}
 */
export function customerInterVal(fn: Function, time: number): interValTimer_type {
    const interValTimer: interValTimer_type = {
        flag: true
    }

    function timeout(fn: Function, time: number) {
        setTimeout(() => {
            if (!interValTimer.flag) {
                return
            }
            fn();
            timeout(fn, time)
        }, time)
    }

    timeout(fn, time)

    return interValTimer
}

export function getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '')
}

export function setLocalStorage(key: string, val: any) {
    localStorage.setItem(key, val)
}

export function getCookie() {

}

export function setCookie() {

}

/**
 * @description: 获取url的参数并转成对象
 * @return {*}
 */
export function getUrlParamsObject() {
    const search = window.location.href.split('?')[1].slice(1);
    const paramArr = search.split('&')
    const params: {
        [key: string]: any
    } = {}

    paramArr.forEach(item => {
        const key = item.split('=')[0]
        const val = item.split('=')[1]
        params[key] = val
    })

    return params
}

/**
 * @description: 获取dom节点的旋转角度
 * @param {string} matrix matrix字符串
 * @return {number}
 */
export function getDomRotateDeg(matrix: string): number {
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const c = parseFloat(values[2]);
    const d = parseFloat(values[3]);

    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle
}

/**
 * @description: px转rem单位
 * @param {string} unit
 * @return {*}
 */
export function pxToRemUnit(unit: string | number): string {
    let num = 0
    if (typeof unit === 'string') {
        num = Number(unit.split('p')[0])
    } else {
        num = unit
    }

    return num / import.meta.env.VITE_FIX_UNIT + 'rem'
}