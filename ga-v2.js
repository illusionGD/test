(function () {
    const tracker = {
        userInfo: {},
        gaTrackId: '',
        gameCode: '',
        activitycode: '',
        userInfo: {},
        device: '',
        version: '1.0',
        heartBeatUrl: 'https://apm.efun.com/apm/heartbeat',
        interactive: false, // 标记用户是否有互动

        init({
            gaId,
            gameCode,
            activityCode
            // tbName
        }) {
            tracker.startTime = new Date().getTime()
            tracker.gaTrackId = gaId || '';
            tracker.initHtmlHead()
            tracker.bindEvent()
            tracker.activitycode = activityCode || '';
            tracker.gameCode = gameCode;
            tracker.tbName = 'web_user_action'; // 表名，默认web_user_action
            tracker.userInfo = Object.assign(tracker.userInfo, tracker.getUserInfo())
            tracker.device = tracker.getLocalStorage('device');
            if (!tracker.device) {
                tracker.device = tracker.getUUid()
                tracker.setLocalStorage('device', tracker.device)
            }
            const pageViewOption = tracker.getHeartBeatOptions('pageView', 'pageView')
            // console.log("🚀 ~ file: ga-v2.js ~ line 24 ~ pageViewOption", pageViewOption)
            tracker.heartbeat([pageViewOption])
        },
        /**初始化head标签 */
        initHtmlHead() {
            const head = document.getElementsByTagName('head')[0]
            const scriptSrcGaTag = document.createElement('script')
            const scriptAnalyticsTag = document.createElement('script')
            const scriptTag = document.createElement('script')
            scriptAnalyticsTag.async = true
            scriptSrcGaTag.async = true
            scriptSrcGaTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + tracker.gaTrackId
            scriptAnalyticsTag.src = 'https://www.google-analytics.com/analytics.js'
            head.appendChild(scriptAnalyticsTag)
            head.appendChild(scriptSrcGaTag)
            scriptTag.innerHTML = `
                        window.dataLayer = window.dataLayer || []
                        function gtag() {
                            dataLayer.push(arguments)
                        }
                        gtag('js', new Date())
                        gtag('config', '${tracker.gaTrackId}')
                    `
            head.appendChild(scriptTag)

        },
        /**埋点事件 */
        sendTrackEvent(type, action = '点击', label, callback) {
            // 上报google
            tracker.sendToGoogleAnalytics(type, action, label, callback)

            const options = tracker.getHeartBeatOptions(type, action, label)
            // console.log("🚀 ~ file: ga.js ~ line 66 ~ options", options)
            tracker.heartbeat([options])
        },
        /**
         * @description: 绑定事件
         * @return {*}
         */
        bindEvent() {
            /**上报页面加载时间和pageView */
            window.addEventListener('load', () => {
                // 去掉页面停留时间
                const performanceObj = tracker.filterObject(tracker.getPerformanceTime('all'), (key, val) => {
                    return key !== 'stop_time'
                })
                const loadOption = tracker.getHeartBeatOptions('性能监控', '性能监控', '', {}, performanceObj)
                // console.log('loadOption', loadOption);
                tracker.heartbeat([loadOption])
            })

            /**上报页面停留时间 */
            window.addEventListener('beforeunload', (e) => {
                const outOption = {
                    stop_time: tracker.getPerformanceTime('stop'),
                    interactive: tracker.interactive
                }
                const stopOption = tracker.getHeartBeatOptions('页面跳出', '页面跳出', '', {}, outOption)
                // console.log(stopOption);
                tracker.heartbeat([stopOption])
            })

            // 监听用户交互
            const body = document.querySelector('html');
            body.addEventListener("click", tracker.changeInteractive);
            body.addEventListener("keydown", tracker.changeInteractive);
            body.addEventListener("mousewheel", tracker.changeInteractive);
        },
        changeInteractive() {
            tracker.interactive = true
        },

        /**发送到GoogleAnalytics */
        sendToGoogleAnalytics(type, action, label, callback) {
            if (gtag) {
                gtag('event', action, {
                    event_category: type,
                    event_label: label || action,
                    event_callback: () => {
                        tracker.gaCallback(callback)
                    }
                })
            } else {
                gaCallback(callback)
            }
        },

        gaCallback(callback) {
            if (callback && typeof callback !== 'function') {
                location.href = callback
            } else {
                callback && callback()
            }
        },

        /**
         * @description: 数据上报后端
         * @param {*} datas 数据上报数组，可一次性上报多个数据
         * @return {*}
         */
        heartbeat(datas = []) {
            return new Promise((resolve, reject) => {
                if (!(datas instanceof Array)) {
                    console.log('datas is not array');
                    return
                }
                const url = tracker.heartBeatUrl;
                const heads = {
                    'content-type': 'application/json',
                    game: tracker.gameCode,
                    device: tracker.device
                }
                const data = {
                    version: tracker.version,
                    datas
                }
                const params = {
                    url,
                    method: 'post',
                    heads,
                    data
                }
                tracker.ajax(params).then((res) => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
            // console.log(res);
        },

        /**
         * @description: 获取埋点事件上报接口参数
         * @param {string} action_category 事件类型
         * @param {string} action 事件操作
         * @param {string} label 事件标签
         * @param {object} tagsOtherInfo tags其他参数信息
         * @param {object} fieldsOtherInfo fields其他参数信息
         * @return {object}
         */
        getHeartBeatOptions(action_category, action, label, tagsOtherInfo = {}, fieldsOtherInfo = {}) {
            // url上的tags参数
            const urlParams = tracker.getUrlParams()

            // tags
            const tags = {
                ...tracker.getBaseTags(action),
                action_category,
                label: label || action,
                ...tagsOtherInfo
            }

            // fields
            const fields = {
                ...tracker.getBaseFields(),
                ...fieldsOtherInfo
            }

            const newTags = tracker.transformObjKeyToLow(tags)
            const newFields = tracker.transformObjKeyToLow(fields)

            return {
                tb: tracker.tbName,
                logtime: tracker.millisecondToSecond(new Date().getTime()),
                msgid: tracker.formatUUidTo32(tracker.getUUid()),
                tags: newTags,
                fields: newFields
            };
        },
        /**
         * @description: 将对象key的驼峰转成下划线
         * @param {*} obj
         * @return {*}
         */
        transformObjKeyToLow(obj) {
            if (obj instanceof Object) {
                const res = {}
                for (const key in obj) {
                    const k = tracker.humpToLine(key)
                    const val = obj[key]
                    res[k] = val
                }
                return res
            }
            return obj
        },
        /**生成uuid */
        getUUid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        /**将uuid转成32位 */
        formatUUidTo32(uuid) {
            if (uuid.length > 32) {
                const uuidArr = uuid.split('-');
                return uuidArr.slice(0, 4).join('') + '-' + uuidArr[uuidArr.length - 1]
            }
        },
        /**
         * @description: 获取性能监控对象
         * @return {*}
         */
        getPerformanceObj() {
            return {
                load_time: tracker.getPerformanceTime('load'),
                dns_time: tracker.getPerformanceTime('dns'),
                tcp_time: tracker.getPerformanceTime('tcp'),
                request_time: tracker.getPerformanceTime('request'),
                redirect_time: tracker.getPerformanceTime('redirect'),
                response_time: tracker.getPerformanceTime('response')
            }
        },

        /**
         * @description: 获取相关加载时间
         * @param {*} type white-白屏，load-加载，stop-停留，以此類推，all-返回一个获取全部时间的对象
         * @return {number}
         */
        getPerformanceTime(type) {
            const performance = window.performance

            if (!performance) {
                console.log('performance no support')
                return
            }
            if (performance.getEntries) {
                return tracker.getTimesByNavigationTiming(type)
            }
            // 兼容
            if (performance.timing) {
                return tracker.getTimesByTiming(type)
            }
        },

        getTimesByTiming(type) {
            const timing = performance.timing
            let time = 0

            const typeMap = {
                'white': () => {
                    time = timing.responseEnd - timing.requestStart
                },
                'load': () => {
                    time = timing.loadEventStart - timing.navigationStart
                },
                'stop': () => {
                    time = performance.now()
                },
                'redirect': () => {
                    time = timing.redirectEnd - timing.redirectStart
                },
                'dns': () => {
                    time = timing.domainLookupEnd - timing.domainLookupStart
                },
                'tcp': () => {
                    time = timing.connectEnd - timing.connectStart
                },
                'request': () => {
                    time = timing.responseStart - timing.requestStart
                },
                'response': () => {
                    time = timing.responseEnd - timing.responseStart
                }
            }

            if (type === 'all') {
                const allTimeObj = {}
                for (let key in typeMap) {
                    allTimeObj[`${key}_time`] = typeMap[key]()
                }
                return allTimeObj
            }

            typeMap[type]()

            return Math.ceil(time)
        },

        getTimesByNavigationTiming(type) {
            const timing = performance.getEntries()[0]
            let time = 0

            const typeMap = {
                'white': () => {
                    time = timing.responseEnd - timing.requestStart
                },
                'load': () => {
                    time = timing.loadEventStart - timing.startTime
                },
                'stop': () => {
                    time = performance.now()
                },
                'redirect': () => {
                    time = timing.redirectEnd - timing.redirectStart
                },
                'dns': () => {
                    time = timing.domainLookupEnd - timing.domainLookupStart
                },
                'tcp': () => {
                    time = timing.connectEnd - timing.connectStart
                },
                'request': () => {
                    time = timing.responseStart - timing.requestStart
                },
                'response': () => {
                    time = timing.responseEnd - timing.responseStart
                }
            }
            if (type === 'all') {
                const allTimeObj = {}
                for (let key in typeMap) {
                    typeMap[key]()
                    allTimeObj[`${key}_time`] = Math.round(time)
                }

                return allTimeObj
            }
            typeMap[type]()

            return Math.round(time)
        },

        /**
         * @description: 获取数据上报的基本fields，用于统计的字段内容，统计可以用的字段
         * @return {*}
         */
        getBaseFields() {
            return tracker.filterObject({
                client_id: tracker.device,
                phone: tracker.userInfo.phone,
                userid: tracker.userInfo.userid
            }, (key, val) => val)
        },

        /**
         * @description: 获取数据上报的基本tags
         * @return {*}
         */
        getBaseTags(action) {
            const titleDom = document.querySelector('head title')
            const web_title = titleDom.innerHTML
            const url = window.location.href.split('?')[0]

            return {
                page_id: tracker.gaTrackId,
                gamecode: tracker.gameCode,
                action: action || '点击',
                activitycode: tracker.activitycode,
                url,
                web_title,
                ...tracker.getAdvertInfo()
            }
        },

        /**获取用户信息 */
        getUserInfo() {
            return {
                timestamp: tracker.getCookie('timestamp') || tracker.getCookie('loginTimestamp'),
                userid: tracker.getCookie('userId') || tracker.getCookie('efunUserid'),
                phone: tracker.getCookie('accountName') || tracker.getCookie('userName') || ''
            }
        },

        /**获取广告相关信息 */
        getAdvertInfo() {
            const advertSource = tracker.getQueryString('utm_source');
            const advertType = tracker.getQueryString('utm_medium');
            const advertName = tracker.getQueryString('utm_campaign');
            let advertiser = advertSource ? advertSource : '';
            let adsid = ''
            if (advertType || advertName) {
                adsid = advertType + '_' + advertName
            }
            return {
                advertiser,
                adsid
            }
        },

        /**
         * @description: 将毫秒转为秒
         * @return {*}
         */
        millisecondToSecond(timestamp) {
            return Math.ceil(Number(timestamp) / 1000)
        },

        getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return '';
        },

        getCookie(name) {
            const strCookie = document.cookie;
            const arrCookie = strCookie.split(';');
            for (let i = 0; i < arrCookie.length; i++) {
                let temp = arrCookie[i].split('=');
                if (temp[0].trim() === name) {
                    return temp[1];
                }
            }
            return '';
        },

        /**
         * @description: 获取url参数并转为对象
         * @return {*}
         */
        getUrlParams() {
            var r = window.location.search.substring(1) || '';
            const params = {}
            if (r) {
                const paramArr = r.split('&');

                paramArr.length && paramArr.forEach(item => {
                    const temp = item.split('=')
                    const key = temp[0]
                    const val = temp[1]

                    params[key] = val
                })
            }
            return params;
        },

        getLocalStorage(val) {
            return JSON.parse(localStorage.getItem(val))
        },

        setLocalStorage(key, val) {
            localStorage.setItem(key, JSON.stringify(val))
        },

        /**
         * @description: 过滤对象
         * @return {*}
         */
        filterObject(obj, fun) {
            return Object.keys(obj)
                .filter(function (key) {
                    return fun(key, obj[key])
                })
                .reduce(function (result, key) {
                    result[key] = obj[key];
                    return result;
                }, {});
        },

        /**
         * @description: 驼峰转下划线
         * @param {*} name
         * @return {*}
         */
        humpToLine(str) {
            if (!str) {
                return ''
            }
            const first = str.slice(0, 1).toLowerCase()
            const other = str.slice(1).replace(/([A-Z])/g, "_$1").toLowerCase()
            return first + other;
        },

        ajax(options) {
            let url = options.url
            const method = options.method.toLocaleLowerCase() || 'get'
            const async = options.async != false // default is true
            const data = options.data;
            const heads = options.heads;
            let xhr;
            //考虑兼容性
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveObject) { //兼容IE6以下版本
                xhr = new ActiveXobject('Microsoft.XMLHTTP');
            }

            if (options.timeout && options.timeout > 0) {
                xhr.timeout = options.timeout
            }
            return new Promise((resolve, reject) => {
                xhr.ontimeout = () => reject && reject('请求超时')

                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                            // 接口连接成功时对数据的处理
                            // 先将返回的字符串转换为json格式
                            let result = JSON.parse(xhr.responseText)
                            // 如果接口返回有错误信息error则打印出error（对错误信息做处理，可以是提示，这里用的打印）
                            if (result.error) {
                                console.log(result.error)
                            } else {
                                // 如果接口返回没有错误提示而是返回正确数据时，则调用回调函数，返回正确信息，返回的信息也需要
                                resolve && resolve(result)
                            }
                        } else {
                            // 接口连接失败时
                            reject && reject('请求失败')
                            console.log("接口连接失败")
                        }
                    }
                }
                xhr.onerror = err => reject && reject(err)
                let paramArr = []
                //如果为GET传输方式的时候 需要将数据拼接到url地址后
                if (method === 'get') {
                    let encodeData
                    if (data instanceof Object) {
                        for (let key in data) {
                            paramArr.push(key + '=' + data[key])
                        }
                        encodeData = paramArr.join('&')
                    }
                    // 检测 url 中是否已存在 ? 及其位置
                    const index = url.indexOf('?')
                    if (index === -1) url += '?'
                    else if (index !== url.length - 1) url += '&'
                    // 拼接 url
                    url += encodeData
                }
                xhr.open(method, url, async)
                // 判断传输方式为get还是post ，如果是get则send数据为null,如果为post则将数据转为json字符串传输，其中get的数据已经在上面做了处理
                if (method === 'get') xhr.send(null)
                else {
                    // post 方式需要设置请求头
                    if (heads instanceof Object) {
                        for (let key in heads) {
                            xhr.setRequestHeader(key, heads[key])
                        }
                    }
                    xhr.send(JSON.stringify(data))
                }
            })
        }
    }
    window.tracker = tracker
    window.sendTrackEvent = tracker.sendTrackEvent
    console.log(tracker);
})(window)