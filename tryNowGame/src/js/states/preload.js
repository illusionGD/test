// 游戏加载场景
var preloadState = function () {
    var graphics;
    var loadText;
    this.preload = function () {
        graphics = game.add.graphics();
        loadText = game.add.text(game.world.centerX, game.world.centerY + 50, '0%', {
            fill: '#fff'
        });
        game.load.image(keyMap.startBgImg, './assets/images/play_bg.png');
        game.load.image(keyMap.playerBullet1, './assets/images/player_bullet1.png');
        game.load.image(keyMap.popBgImg, './assets/images/bg_pop.png');
        game.load.image(keyMap.btnClose, './assets/images/btn_close.png');
        game.load.image(keyMap.enemy, './assets/images/enemy.png');
        game.load.spritesheet(keyMap.player, './assets/images/player.png', 32, 48, 9);
        game.load.atlas(keyMap.joystick, './assets/images/joystick.png', './assets/json/joystick.json');
        game.load.onFileComplete.add(onLoading);
    }

    this.create = function () {
        game.state.start('gameStartState');
    }
    this.update = function () {

    }

    function onLoading(progress) {
        graphics.beginFill(0xffffff);
        graphics.drawRect(10, game.world.centerY, game.world.width * (progress / 100) - 20, 10);
        loadText.text = `${progress}%`;
    }
}