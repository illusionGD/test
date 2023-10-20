// 劫持原生事件监听方法
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args) {
        try {
            return listener.apply(this, args);
        } catch (err) {
            throw err;
        }
    }
    return originAddEventListener.call(this, type, wrappedListener, options);
}

// window.addEventListener('error', (event) => {
//     console.log("addEventListener('error')：", event);
// })
window.addEventListener('error', (event) => {
    // console.log("addEventListener('error')：", event);
    // if () {

    // }
}, true)

// window.addEventListener("unhandledrejection", function (e) {
//     console.log('promise回调（unhandledrejection）：', e);
// });

window.onerror = function (message, source, lineno, colno, error) {
    console.log('window.onerror: ', {
        message,
        source,
        lineno,
        colno,
        error
    });
}

// initAjax()
// $.ajax({
//     url: 'https://yun.tuia.cn/image/kkk.png'
// })

function initAjax() {
    if (!XMLHttpRequest) {
        return;
    }

    const nativeAjaxSend = XMLHttpRequest.prototype.send; // 首先将原生的方法保存。
    const nativeAjaxOpen = XMLHttpRequest.prototype.open;


    XMLHttpRequest.prototype.open = function (mothod, url, ...args) { // 劫持open方法，是为了拿到请求的url
        const xhrInstance = this;
        xhrInstance._url = url;
        return nativeAjaxOpen.apply(this, [mothod, url].concat(args));
    }

    XMLHttpRequest.prototype.send = function (...args) { // 对于ajax请求的监控，主要是在send方法里处理。

        const oldCb = this.onreadystatechange;
        const oldErrorCb = this.onerror;
        const xhrInstance = this;

        xhrInstance.addEventListener('error', function (e) { // 这里捕获到的error是一个ProgressEvent。e.target 的值为 XMLHttpRequest的实例。当网络错误(ajax并没有发出去)或者发生跨域的时候，会触发XMLHttpRequest的error, 此时，e.target.status 的值为:0，e.target.statusText 的值为:''
            console.log("🚀 ~ file: error.js:96 ~ e:", e)
            const errorObj = {
                error_msg: 'ajax filed',
                error_stack: JSON.stringify({
                    status: e.target.status,
                    statusText: e.target.statusText
                }),
                error_native: e,
            }
            console.log("🚀 ~ file: error.js:92 ~ errorObj:", errorObj)

            /*接下来可以对errorObj进行统一处理*/

        });



        xhrInstance.addEventListener('abort', function (e) { // 主动取消ajax的情况需要标注，否则可能会产生误报
            if (e.type === 'abort') {
                xhrInstance._isAbort = true;
            }
        });


        this.onreadystatechange = function (...innerArgs) {
            if (xhrInstance.readyState === 4) {
                if (!xhrInstance._isAbort && xhrInstance.status !== 200) { // 请求不成功时，拿到错误信息
                    const errorObj = {
                        error_msg: JSON.stringify({
                            code: xhrInstance.status,
                            msg: xhrInstance.statusText,
                            url: xhrInstance._url
                        }),
                        error_stack: '',
                        error_native: xhrInstance
                    };
                    console.log("🚀 ~ file: error.js:119 ~ errorObj:", errorObj)

                    /*接下来可以对errorObj进行统一处理*/

                }

            }
            oldCb && oldCb.apply(this, innerArgs);
        }
        return nativeAjaxSend.apply(this, args);
    }
}