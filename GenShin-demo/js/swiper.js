import {activities, characteristy} from '../data/data.js'

// 活动轮播图
$(function() {
  const $activity = $('.swiper-activity');
  const $list = $('.swiper-activity>div>ul');
  // 添加活动
  activities.forEach(item=> {
    addActivity(item.img, item.des);
  });
  addActivity(activities[0].img, activities[0].des);

  const $arrowLeft = $activity.children('.arrow_left');
  const $arrowRight = $activity.children('.arrow_right');
  const swiperNum = $list.children('li').length;
  let currentIndex = 0;
  const anTime = 300;
  const autoPlayTime = 3000;
  let moving = false;

  $list.css('width', swiperNum * $activity.width());
  // 初始化ul的总长
  window.addEventListener('resize', ()=> {
    $list.css('width', swiperNum * $activity.width());
  });

  // 左右箭头点击事件
  $arrowLeft.click(()=> {
    if (moving) {
      return;
    }
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      $list.css('left', - (swiperNum - 1) * $activity.width())
      currentIndex = swiperNum - 2;
    }
    // console.log(currentIndex)
    move();
  });
  $arrowRight.click(()=> {
    if (moving) {
      return;
    }
    if (currentIndex < swiperNum - 1) {
      currentIndex++;
    } else {
      $list.css('left', 0)
      currentIndex = 1;
    }
    // console.log(currentIndex)
    move();
  });

  // 自动播放
  setInterval(()=> {
    $arrowRight.click();
  }, autoPlayTime);

  function move() {
    moving = true;
    $list.animate({
      left: - currentIndex * $activity.width()
    }, anTime, '', ()=> {
      moving = false;
    })
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
});


// 游戏特色轮播图
$(function () {
  const $swiperList = $('.swiper-characteristic>div>ul');
  const $circleList = $('.swiper-circle');

  
  // 初始化swiper列表
  characteristy.forEach(item=> {
    addCharacteristy(item.url);
  });
  
  const $children = $('.swiper-characteristic>div>ul>img');
  const $arrowLeft = $('.swiper-characteristic .arrow_left');
  const $arrowRight = $('.swiper-characteristic .arrow_right');
  const swiperNum = characteristy.length;
  const autoTime = 3000;
  const commonClass = 'swiper-slide';
  const preClass = 'swiper-slide-pre';
  const nextClass = 'swiper-slide-next';
  const activeClass = 'swiper-slide-active';
  let preIndex = 0;
  let nextIndex = 2;
  let currentIndex = 1;
  let moving = false;

  $($children[currentIndex]).toggleClass(`${commonClass} ${activeClass}`);
  $($children[preIndex]).toggleClass(`${preClass}`);
  $($children[nextIndex]).toggleClass(`${nextClass}`);
  // 防抖
  $children.each((index, item)=> {
    $(item).on('transitionend', ()=> {
      moving = false;
    })
  });

  circleStyle();

  // 自动播放
  setInterval(() => {
    $arrowRight.click();
  }, autoTime);

  // 圆点点击事件 
  $circleList.click(e=> {
    if (moving) {
      return;
    }
    moving = true;
    currentIndex = $(e.target).index();
    setIndex(currentIndex);
    move();
    circleStyle()
  })
  $arrowLeft.click(()=> {
    if (moving) {
      return;
    }
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = swiperNum - 1;
    }
    setIndex(currentIndex)

    move();
    circleStyle();
  });
  $arrowRight.click(()=> {
    if (moving) {
      return;
    }
    if (currentIndex < swiperNum - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    setIndex(currentIndex)

    move();
    circleStyle();
  });

  function move() {
    moving = true;
    $children.each((index, item)=> {
      if (index === currentIndex) {
        $(item).removeClass(`${commonClass} ${nextClass} ${preClass}`);
        $(item).addClass(activeClass);
      } else if (index === preIndex) {
        $(item).removeClass(activeClass);
        $(item).addClass(`${commonClass} ${preClass}`);
      } else if (index === nextIndex) {
        $(item).removeClass(activeClass);
        $(item).addClass(`${commonClass} ${nextClass}`);
      } else {
        $(item).removeClass(`${activeClass} ${nextClass} ${preClass}`);
        $(item).addClass(commonClass);
      }
    })
  }
  function circleStyle() {
    $circleList.children().each((index, item)=> {
      if (index === currentIndex) {
        item.style.backgroundImage = 'url(./images/icons/轮播图点-亮.png)';
      } else {
        item.style.backgroundImage = 'url(./images/icons/轮播图点.png)';
      }
    })
  }
  // 设置前后index
  function setIndex(current) {
    if (current <= 0) {
      preIndex = swiperNum - 1;
      nextIndex = 1;
    } else if (current >= swiperNum - 1) {
      preIndex = swiperNum - 2;
      nextIndex = 0;
    } else {
      preIndex = current - 1;
      nextIndex = current + 1;
    }
  }

  function addCharacteristy(imgUrl) {
    $swiperList.append(
      `<img class="swiper-slide" src=${imgUrl} alt="">`
    );
    $circleList.append(
      `<span></span>`
    )
  }
})