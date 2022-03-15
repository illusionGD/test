export function mySetInterval(fn, timeout){
    const timer = {flag: true};

    function interval() {
        if (timer.flag) {
            fn();
            setTimeout(interval, timeout);
        }
    };

    setTimeout(interval, timeout);
    
    return timer;
}