// 游戏开始界面场景
var gameStartState = function () {
    var player;
    var timeoutText;
    var timeCount = 30;
    var isGameEnd = false;
    var timeout;
    var endPop;
    this.preload = function () {}
    this.create = function () {
        game.add.tileSprite(0, 0, 1920, 1920, keyMap.startBgImg);
        // 设置物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 创建角色
        player = new Player();
        game.camera.follow(player.player);
        game.world.setBounds(0, 0, 1920, 1920);

        // 定时器
        timeout = game.time.events.repeat(Phaser.Timer.SECOND * 1, 30, onTimeout, this);
        timeoutText = game.add.text(game.camera.width / 2, 100, `00:${timeCount}`, {
            font: 'bold 32px Arial',
            fill: '#fff'
        });
        timeoutText.fixedToCamera = true;
        timeoutText.anchor.set(0.5, 0.5);
    }

    this.update = function () {
        if (isGameEnd) {
            return;
        }
        player.run();
    }

    /**
     * @description: 监听计算器事件
     */
    function onTimeout() {
        if (timeCount === 0) {
            game.time.events.remove(timeout)
            // gameEnd();
            return;
        }
        const count = timeCount - 1 >= 10 ? timeCount -= 1 : '0' + (timeCount -= 1);
        timeoutText.text = `00:${count}`;
    }

    /**
     * @description: 游戏结束
     */
    function gameEnd() {
        isGameEnd = true;
        player.stop();
        endPopUp();
    }

    /**
     * @description: 弹出结束弹窗
     */
    function endPopUp() {

    }
}