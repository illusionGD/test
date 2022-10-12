// 游戏开始界面场景
var gameStartState = function () {
    let player;
    this.preload = function () {}
    this.create = function () {
        game.add.tileSprite(0, 0, 1920, 1920, keyMap.startBgImg);
        game.physics.startSystem(Phaser.Physics.ARCADE)
        player = new Player();
        game.camera.follow(player.player);
        game.world.setBounds(0, 0, 1920, 1920);
    }

    this.update = function () {
        player.run();
    }

    this.render = function () {
        game.debug
    }
}
