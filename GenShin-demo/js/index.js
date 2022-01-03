$(function () {
  const $officalBtn = $('#page1 .official-link');
  const $mark = $('#mark');
  const $player = $('#mark video');
  const $videoBtn1 = $('#page1-player-btn');

  // 跳转官网
  $('#page1 .logo-text').click(jumpOffical);
  $officalBtn.click(jumpOffical);

  // 播放视频
  $videoBtn1.click(()=> {
    $mark.css('display', 'flex');
  })
  // 关闭播放页面
  $mark.click(()=> {
    $mark.css('display', 'none');
    $player.trigger('pause');
  })
})

function jumpOffical() {
  window.location = "https://ys.mihoyo.com/main/";
}