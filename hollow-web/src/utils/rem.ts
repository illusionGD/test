;
(function (win: Window) {
    const doc = win.document;
    const docEl = doc.documentElement;
    let tid: any;

    function refreshRem() {
        const width = docEl.getBoundingClientRect().width;
        const rem = width / 100;
        docEl.style.fontSize = rem + 'px';
    }

    // win.addEventListener('resize', function () {
    //     clearTimeout(tid);
    //     tid = setTimeout(refreshRem, 300);
    // }, false);
    // win.addEventListener('pageshow', function (e) {
    //     if (e.persisted) {
    //         clearTimeout(tid);
    //         tid = setTimeout(refreshRem, 300);
    //     }
    // }, false);

    refreshRem();

})(window);