/*
 * @Author: Hollow 
 * @Date: 2022-03-14 21:37:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-03-14 22:30:41
 * @description 获取设备信息，判断pc、mb、ios、Android、微信等
 */

 class DeviceInfo {
    userAgent = navigator.userAgent;
    device = '';

    constructor() {
        this.init();
    }

    init() {
        if (this.constructor.isPC(this.userAgent)) {
            this.device = 'pc';
        } else if (this.constructor.isMb(this.userAgent)) {
            this.device = 'mb';
        } else if (this.constructor.isWeChat(this.userAgent)) {
            this.device = 'weChat';
        }  else if (this.constructor.isIos(this.userAgent)) {
            this.device = 'ios';
        } else if (this.constructor.isAndroid(this.userAgent)) {
            this.device = 'android';
        }
    }
    
    /**判断是否为pc */
    static isPC(ua) {
        return !/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua);
    }

    /**判断是否为mb */
    static isMb(ua) {
        return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua);
    }

    /**判断是否为微信 */
    static isWeChat(ua) {
        if(ua.match(/MicroMessenger/i) == "micromessenger") {  
            return true;  
        } else {  
            return false;  
        }  
    }

    /**判断是否为ios */
    static isIos(ua) {
        return /(iPhone|iPad|iPod|iOS)/i.test(ua);
    }

    /**判断是否为Android */
    static isAndroid() {
        return /(Android|Adr)/i.test(ua);
    }

    getDeivce() {
        console.log(this);
        return this.device;
    }
}