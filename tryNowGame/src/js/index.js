// 计算视口宽高，做一定程度的设配
const screenW = parseInt(window.getComputedStyle(document.getElementById('game')).width);
const screenH = document.documentElement.clientHeight;

var game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'game');


/**
 * @description: 资源key集合对象
 */
const keyMap = {
    startBgImg: 'startBgImg',
    playBgImg: 'playBgImg',
    joystick: 'joystick',
    player: 'player',
    playerBullet1: 'playerBullet1',
}

game.state.add('preloadState', preloadState)
game.state.add('gameStartState', gameStartState)
// game.state.add('gamePlayState', gamePlayState)
// game.state.add('gameEndState', gameEndState)
game.state.start('preloadState', preloadState)
