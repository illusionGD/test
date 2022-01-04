import {activities} from '../data/data.js'

$(function() {
  const $activity = $('.swiper-activity');
  const $list = $('.swiper-activity>div>ul');
  // 添加活动
  activities.forEach(item=> {
    addActivity(item.img, item.des);
  });

  const $arrowLeft = $activity.children('.arrow_left');
  const $arrowRight = $activity.children('.arrow_right');
  const swiperNum = $list.children('li').length;
  let currentIndex = 0;
  const anTime = 300;

  // 初始化ul的总长
  window.addEventListener('resize', ()=> {
    $list.css('width', swiperNum * $activity.width());
  });

  // 左右箭头点击事件
  $arrowLeft.click(()=> {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = swiperNum - 1;
    }
    move();
  });
  $arrowRight.click(()=> {
    if (currentIndex < swiperNum - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    move();
  });

  function move() {
    const distance = $list.offsetLeft();
    console.log(distance)
    $list.animate({
      left: - currentIndex * $activity.width()
    }, 300)
    // $list.css('left', - currentIndex * $activity.width());
  }

  function addActivity(imgUrl, des) {
    $list.append(
      `<li>
          <div class="activity-item">
            <img src=${imgUrl.toString()} alt="">
            <p>${des}</p>
          </div>
          <img src="./images/backgrounds/背景图6.jpg" alt="">
        </li>`
    )
  }
})