declare var act_info: any
declare function Swiper(dom: string, options: any): void

interface JQuery {
    // 重载
    fullpage(options: any): void
    bPopup(params?: any): void
}
interface Window {
    business: any
    DeviceInfo: {
        isIos(): boolean
        isAndroid(): boolean
    }
    fbq(action: string, ...args): void
    gtag(func: string, ...args): void
    gtag_report_conversion(url: string, type: string): void
    fullpage(dom: string, options: any): void
}
