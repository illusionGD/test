;(function(win) {
  const doc = win.document;
  const docElem = doc.documentElement;
  const width = docElem.clientWidth;
  const height = docElem.getBoundingClientRect().height;

  remRefreshX();

  win.addEventListener('resize', function() {
    const _width = docElem.clientWidth;
    const _height = docElem.getBoundingClientRect().height;
    const isX = (_width !== width && _width !== width - 1);
    const isY = (_height !== height);

    if (isX) { // width有1px的偏差
      remRefreshX();
    } else if (isY) {
      remRefreshY();
    } else {
      remRefreshX();
    }
  }, false);
  // 设置rem
  function remRefreshX() {
    const width = docElem.getBoundingClientRect().width;
    const rem = width / 10;

    docElem.style.fontSize = rem + 'px';
  }

  function remRefreshY() {
    const _height = docElem.getBoundingClientRect().height;
    const rem = (_height / width) * 100;

    docElem.style.fontSize = rem + 'px';
  }
})(window);
