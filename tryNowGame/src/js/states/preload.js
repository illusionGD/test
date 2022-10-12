// 游戏加载场景
var preloadState = function () {

    this.preload = function () {
        game.load.image(keyMap.startBgImg, './assets/images/play_bg.png')
        game.load.image(keyMap.playerBullet1, './assets/images/player_bullet1.png')
        game.load.spritesheet(keyMap.player, './assets/images/player.png', 32, 48, 9)
        game.load.atlas(keyMap.joystick, './assets/images/joystick.png', './assets/json/joystick.json');
    }
    this.create = function () {
        game.state.start('gameStartState')
    }

    this.update = function () {

    }
}
