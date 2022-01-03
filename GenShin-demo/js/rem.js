;(function(win) {
  const doc = win.document;
  const docElem = doc.documentElement;
  let tid = null;
  

  remRefresh();
  

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(remRefresh, 300);
  }, false);

  // 设置rem
  function remRefresh() {
    const width = docElem.getBoundingClientRect().width;
    const rem = width / 10;

    docElem.style.fontSize = rem + 'px';
  }
})(window);
