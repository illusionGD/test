// 计算视口宽高，做一定程度的设配
const screenW = parseInt(window.getComputedStyle(document.getElementById('game')).width);
const screenH = document.documentElement.clientHeight;
/**
 * @description: 资源key集合对象
 */
const keyMap = {
    startBgImg: 'startBgImg',
    playBgImg: 'playBgImg',
    joystick: 'joystick',
    player: 'player',
    playerBullet1: 'playerBullet1',
    enemy: 'enemy',
    popBgImg: 'popBgImg',
    btnClose: 'btnClose',
    gun: 'gun',
    pet: 'pet',
    collide: 'collide',
    knife: 'knife',
    knifeRotation: 'skl4_9_path',
    // ball: 'ball',
    // skillImage: 'skill_image',
    // skillAtlas: 'skill_atlas',
    // skillJson: 'skill_json',
    topTimeBg: 'topTimeBg',
    tornado: 'tornado',
    fireBall: 'fireBall',
    tornadoRotation: 'skl7_5_target_1'
}


var game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'game');


game.state.add('preloadState', preloadState)
game.state.add('gameStartState', gameStartState)
// game.state.add('gamePlayState', gamePlayState)
// game.state.add('gameEndState', gameEndState)
game.state.start('preloadState', preloadState);