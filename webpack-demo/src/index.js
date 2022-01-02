import '../public/css/index.less'
import '../public/js/index'

if (module.hot) {
  module.hot.accept(['../public/js/index.js', '../public/css/index.less'], ()=> {

  })
}

(function(window){
  /**
   * rem设配
   */
  var doc = window.document;  // 获取文档对象
  var docEle = doc.documentElement;  // 获取文档元素对象
  
  // 动态改变rem值，一旦屏幕发生改变，自动调用该方法重置
  function refreshRem(){
    // 获取设备宽度
    let _width = docEle.getBoundingClientRect().width;

    // 将屏幕的1/10设置为rem的值
    let _rem = _width/10;
    // 重置页面的rem的大小
    docEle.style.fontSize = _rem + 'px';
  }

  // 监听屏幕改变事件
  window.addEventListener('resize', refreshRem());



  /**
   * 轮播图
   */
  let swiper = document.querySelector('.swiper-images');  // 获取轮播图可视化区域
  let swiperList = document.querySelector("#swiper-list");  // 轮播图列表
  let swiperChildren = swiperList.children; // 轮播图的子节点
  let childWidth = swiper.offsetWidth; //获取可视化区域的宽度
  swiperList.style.width = childWidth * swiperChildren.length + 'px'; // 动态设置轮播图的总长
  // 设置每个图片的宽度，设置为可视化区域的宽度(整个屏幕)
  for(let i = 0; i<swiperChildren.length; i++){
    swiperChildren[i].style.width = swiper.offsetWidth + 'px';
  }

  let swiperIndex = 0;  // 轮播图下标
  let arrowL = document.querySelector(".left-arrow"); // 获取左箭头实例
  let arrowR = document.querySelector(".rigth-arrow");  // 获取右箭头实例

  arrowL.addEventListener('click', leftArrowEvent);
  arrowR.addEventListener('click', rigthArrowEvent);

  // 左箭头点击事件
  function leftArrowEvent(){
    if(swiperIndex > 0){
      swiperIndex -= 1;
    } else {
      swiperIndex = swiperChildren.length - 1;
    }

    swiperMove();
  }

  // 右箭头点击事件
  function rigthArrowEvent(){
    if(swiperIndex < swiperChildren.length - 1){
      swiperIndex += 1;
    } else {
      swiperIndex = 0;
    }

    swiperMove();
  }

  // 移动轮播图
  function swiperMove(){
    swiperList.style.left = -swiperIndex * childWidth + 'px'; 
  }
  
  // 设置定时器，定时滚轮轮播图
  setInterval(function swpierTimer(){
    rigthArrowEvent();
  }, 3000)

})(window)