function initFullPage() {
  const fullPage = document.getElementById('fullpage');
  const pageChildren = fullPage.children;
  const limit = pageChildren.length;
  const distance = document.documentElement.clientHeight;
  let currentIndex = 0;
  let scrolling = false;
  fullPage.style.top = '0';
  fullPage.style.transition = 'all .5s';
  fullPage.addEventListener('transitionend', ()=> {
    scrolling = false;
  })
  document.onmousewheel = (e)=> {
    if (scrolling) {
      return;
    }
    if (e.wheelDelta > 0) {
      if (currentIndex > 0) {
        scrolling = true;
        currentIndex--;
        fullPage.style.top = `-${currentIndex * distance}px`;
      }
    } else {
      if (currentIndex < limit - 1) {
        scrolling = true;
        currentIndex++;
        fullPage.style.top = `-${currentIndex * distance}px`;
      }
    }
  }
}

window.addEventListener('load', initFullPage);
window.addEventListener('resize', initFullPage);