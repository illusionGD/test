// 游戏加载场景
var preloadState = function () {
    var graphics;
    var loadText;
    this.preload = function () {
        game.add.plugin(Fabrique.Plugins.Spine);
        graphics = game.add.graphics();
        loadText = game.add.text(game.world.centerX, game.world.centerY + 50, '0%', {
            fill: '#fff'
        });
        game.load.image(keyMap.startBgImg, './assets/images/bg.jpg');
        game.load.image(keyMap.playerBullet1, './assets/images/arrow.png');
        game.load.image(keyMap.popBgImg, './assets/images/bg_pop.png');
        game.load.image(keyMap.btnClose, './assets/images/btn_close.png');
        game.load.image(keyMap.topTimeBg, './assets/images/top_time.png');
        game.load.spritesheet(keyMap.gun, './assets/images/gun.png');
        game.load.spritesheet(keyMap.pet, './assets/images/pet.png', 131, 151, 2);
        game.load.spritesheet(keyMap.enemy, './assets/images/enemy.png', 48, 61, 2);
        game.load.spritesheet(keyMap.fireBall, './assets/images/fire_ball.png', 512, 350, 5);
        // game.load.spritesheet(keyMap.tornado, './assets/images/tornado.png', 360, 181, 30);
        game.load.spritesheet(keyMap.player, './assets/images/role.png', 40, 64, 2);
        game.load.atlas(keyMap.joystick, './assets/images/joystick.png', './assets/json/joystick.json');

        game.load.spine(
            keyMap.tornado, //The key used for Phaser's cache
            './assets/spines/spine7_2_skl7_5_target_1.json' //The location of the spine's json file
        );
        // game.load.image(keyMap.skillImage, './assets/images/spine7_2_skl7_11_target.png');
        // game.load.json(keyMap.skillJson, './assets/json/spine7_2_skl7_11_target.json');
        // game.load.atlas(keyMap.skillAtlas, './assets/images/spine7_2_skl7_11_target.png', './assets/json/spine7_2_skl7_11_target.json');
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