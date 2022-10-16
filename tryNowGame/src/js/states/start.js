// 游戏开始界面场景
var gameStartState = function () {
    var player;
    var timeoutText;
    var timeCount = 30;
    var isGameEnd = false;
    var timeout;
    var endPop;
    var btnClose;
    var awardPop;
    var gameInfoText;
    var killCount = 0;
    var isGameStop = false;
    var timeoutBgImg;
    var petSendFireLastTime = new Date().getTime();
    this.create = function () {
        game.add.tileSprite(0, 0, 1920, 1920, keyMap.startBgImg);
        // 设置物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 创建角色
        player = new Player();
        game.camera.follow(player.player);
        game.world.setBounds(0, 0, 1920, 1920);
        player.addPet();
        // player.addTornadoSkill()

        // 创建敌人工厂
        enemies = new EnemyFactory();
        enemies.init();

        // 游戏信息文本
        gameInfoText = game.add.text(0, 0, `生命: ${player.life}  敌人数量: ${enemies.enemyGroup.total} 击杀数: ${killCount}`, {
            font: '20px Arial',
            fill: '#fff'
        });

        gameInfoText.fixedToCamera = true;

        // 定时器
        timeoutBgImg = game.add.image(0, 0, keyMap.topTimeBg);
        timeoutBgImg.fixedToCamera = true;
        timeout = game.time.events.repeat(Phaser.Timer.SECOND * 1, 30, onTimeout, this);
        timeoutText = game.add.text(game.camera.width / 2, 100, `00:${timeCount}`, {
            font: 'bold 36px Arial',
            fill: '#fff'
        });
        timeoutText.stroke = "#000";
        timeoutText.strokeThickness = 5;
        timeoutText.fixedToCamera = true;
        timeoutText.anchor.set(0.5, 0.5);

        // 创建弹框
        document.querySelector('.pop').addEventListener('click', function () {
            closePop();
        })
    }

    this.update = function () {
        if (isGameEnd || !player.life) {
            gameEnd();
            return;
        }
        if (isGameStop) {
            return;
        }
        // 角色移动
        player.run();

        // 寻找最近的敌人位置
        let target = null;
        if (!player.isPetFire) {
            let minDis = game.camera.width;
            enemies.enemyGroup.forEachAlive(enemy => {
                const distance = game.physics.arcade.distanceToPointer(player.player, enemy.pointer)
                if (distance < minDis) {
                    minDis = distance;
                    target = enemy;
                }
            });
        }
        player.petFire(target);
        player.fire();
        // return;
        // player.tornadosRotate();
        // 敌人移动
        enemies.move(player.player.x, player.player.y);

        // 创建敌人
        var enemyX = game.camera.position.x - (game.camera.width / 2) + Math.random() * game.camera.width;
        var enemy = game.camera.position.y - (game.camera.height / 2) + Math.random() * game.camera.height;
        enemies.createEnemy(enemyX, enemy);


        // 碰撞检测
        game.physics.arcade.overlap(enemies.enemyGroup, player.bullets, bulletHitEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.player, playerHitEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.tornados, tornadoHitEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.pet.fireGroup, bulletHitEnemy, null, this);
    }

    this.render = function () {
        gameInfoText.text = `生命: ${player.life}  敌人数量: ${enemies.enemyGroup.total}  击杀数: ${killCount}`;

        // player.bullets.forEachAlive((item) => {
        // });
    }

    function bulletHitEnemy(enemy, bullet) {
        bullet.kill();
        killEnemy(enemy);
    }

    function playerHitEnemy(p, enemy) {
        player.injury()
        enemy.kill();
    }

    function tornadoHitEnemy(enemy, t) {
        killEnemy(enemy);
    }

    function killEnemy(enemy) {
        enemy.kill();
        killCount += 1;
        // if (killCount === 3) {
        //     stopGame();
        //     awardPopUp();
        //     killCount = 0;
        // }
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

    function closePop() {
        document.querySelector('.pop').style.display = 'none'
        // game.add.tween(awardPop.scale).to({
        //     x: 0,
        //     y: 0
        // }, 500, Phaser.Easing.Elastic.OInt, true);
        isGameStop = false;
        timeout.timer.paused = false;
    }

    /**
     * @description: 游戏结束
     */
    function gameEnd() {
        isGameEnd = true;
        stopGame();
        endPopUp();
    }

    function awardPopUp() {
        // const tween = game.add.tween(awardPop.scale).to({
        //     x: 1,
        //     y: 1
        // }, 500, Phaser.Easing.Elastic.Out, true);
        document.querySelector('.pop').style.display = 'block'
    }

    /**
     * @description: 停止游戏
     */
    function stopGame() {
        player.stop();
        enemies.stop();
        timeout.timer.paused = true;
        isGameStop = true;
    }

    /**
     * @description: 弹出结束弹窗
     */
    function endPopUp() {

    }
}