export function mySetInterval(fn, timeout) {
    const timer = {
        flag: true
    };

    function interval() {
        if (timer.flag) {
            fn();
            setTimeout(interval, timeout);
        }
    };

    setTimeout(interval, timeout);

    return timer;
}

export function isMb() {
    const ua = window.navigator.userAgent;
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua);
}

export function isWeChat() {
    const ua = window.navigator.userAgent;
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

export function isIos() {
    const ua = window.navigator.userAgent;
    return /(iPhone|iPad|iPod|iOS)/i.test(ua);
}

export function isAndroid() {
    const ua = window.navigator.userAgent;
    return /(Android|Adr)/i.test(ua);
}

export function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const search = window.location.search.split('?')[1]
    var r = search ? search.match(reg) : '';
    if (r != null) return decodeURIComponent(r[2]);
    return '';
}

export function isQQ() {
    const ua = window.navigator.userAgent

    return ua.includes("QQTheme") >= 0
}

export const Utils = {
    isMb,
    isWeChat,
    isIos,
    isAndroid,
    getQueryString,
    isQQ
}