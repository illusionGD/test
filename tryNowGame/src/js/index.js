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
    enemy: 'enemy',
    popBgImg: 'popBgImg',
    btnClose: 'btnClose',
}
document.querySelector('.pop').addEventListener('click', function () {
    console.log(1);
    this.style.display = 'none'
})
const utils = {
    /**
     * @description: 计算物体到目标的
     * @param {*} targetX 目标x坐标
     * @param {*} targetY 目标y坐标
     * @param {*} selfX 自身x坐标
     * @param {*} selfY 自身y坐标
     */
    computeDistance: function (targetX, targetY, selfX, selfY) {
        const disX = targetX - selfX;
        const disY = targetY - selfY;
        const dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

        return {
            x: disX / dis,
            y: disY / dis
        }
    }
}

game.state.add('preloadState', preloadState)
game.state.add('gameStartState', gameStartState)
// game.state.add('gamePlayState', gamePlayState)
// game.state.add('gameEndState', gameEndState)
game.state.start('preloadState', preloadState)