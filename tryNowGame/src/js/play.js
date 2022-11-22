// 游戏游玩场景
var gamePlayState = function () {
    var player;
    var timeoutText;
    var timeCount = 30;
    var isGameEnd = false;
    var timeout;
    var killCount = 0;
    var isGameStop = false;
    var skillList = [];
    var timeoutBgImg;
    var gameInfo;
    // var point = 3;
    var point = [3, 3, 3];
    var audioHitEnemy;
    var hitAudioStop = false;
    var enemies;
    var audioBg;
    var bgSize = rem2px(19.2) * 2;

    this.create = function () {
        const baseConfig = getConfig('baseConfig');
        timeCount = baseConfig.timeCount;
        point = [baseConfig.point0, baseConfig.point1, baseConfig.point2];

        game.add.tileSprite(0, 0, bgSize, bgSize, keyMap.startBgImg);
        // 设置物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 背景音乐
        audioBg = game.add.audio(keyMap.audioBg, 1, true);
        audioBg.play();
        // 怪物击中音效
        audioHitEnemy = game.add.audio(keyMap.audioHit, 0.5);
        audioHitEnemy.onStop.add(() => {
            hitAudioStop = false;
        }, this);

        // 创建角色
        player = new Player();
        game.camera.follow(player.player);
        game.world.setBounds(0, 0, bgSize, bgSize);

        // 创建敌人工厂
        enemies = new EnemyFactory();
        enemies.init();

        // 定时器
        timeoutBgImg = game.add.image(0, 0, keyMap.topTimeBg);
        timeoutBgImg.fixedToCamera = true;
        const scaleVal = scaleAdaptation(750);
        timeoutBgImg.scale.set(scaleVal, scaleVal);
        timeout = game.time.events.repeat(Phaser.Timer.SECOND * 1, timeCount + 1, onTimeout, this);
        timeoutText = game.add.text(game.camera.width / 2, rem2px(1.05), `00:${timeCount}`, {
            font: `bold ${rem2px(0.4)}px Arial`,
            fill: '#fff'
        });
        timeoutText.stroke = "#000";
        timeoutText.strokeThickness = 5;
        timeoutText.fixedToCamera = true;
        timeoutText.anchor.set(0.5, 0.5);

        // gameInfo = game.add.text(0, rem2px(1.1),
        //     `怪物数:${enemies.enemyGroup.length}\n生命值: ${player.life}`, {
        //         font: `bold ${rem2px(0.4)}px Arial`,
        //         fill: '#fff'
        //     });
        // gameInfo.fixedToCamera = true;
    }

    this.update = function () {
        if (isGameStop) {
            return;
        }

        if (isGameEnd || (player.life <= 0)) {
            gameEnd();
            return;
        }

        // 角色移动
        player.run();

        // 寻找最近的敌人位置
        let target = null;
        let minDis = game.camera.width;
        enemies.enemyGroup.forEachAlive(enemy => {
            if (!enemy.isDead) {
                const distance = game.physics.arcade.distanceToPointer(player.player, enemy.pointer)
                if (distance < minDis) {
                    minDis = distance;
                    target = enemy;
                }
            }
        });
        // 普通攻击
        player.fire(target);
        // 小刀
        player.fireKnife();
        // 宠物攻击
        player.petFire();
        // 龙卷风旋转
        player.tornadosRotate();
        // 敌人移动
        enemies.move(player.player.x, player.player.y);

        // 创建敌人
        enemies.createEnemy(player.player.x, player.player.y);

        // 碰撞检测
        game.physics.arcade.overlap(enemies.enemyGroup, player.bullets, bulletHitEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.player, playerHitEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.tornados, killEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.pet.fireGroup, killEnemy, null, this);
        game.physics.arcade.overlap(enemies.enemyGroup, player.KnifeGroup, killEnemy, null, this);
    }

    this.render = function () {
        // gameInfo.text = `怪物数:${enemies.enemyGroup.length}\n生命值: ${player.life}`
        // game.debug.body(player.player)
        // player.bullets.forEachAlive((item) => {
        //     game.debug.body(item)
        // });
        // player.tornados.forEach((item) => {
        //     game.debug.body(item)
        // });
        // player.KnifeGroup.forEach((item) => {
        //     game.debug.body(item)
        // });
        // player.pet.fireGroup.forEachAlive((item) => {
        //     game.debug.body(item)
        // });
        // enemies.enemyGroup.forEachAlive(item => {
        //     game.debug.body(item)
        // })
    }

    function bulletHitEnemy(enemy, bullet) {
        bullet.kill();
        killEnemy(enemy, 1);
    }

    function playerHitEnemy(p, enemy) {
        if (!enemy.isDead && !enemy.isJury) {
            player.injury();
            killEnemy(enemy);
        }
    }

    function killEnemy(enemy) {
        if (!hitAudioStop) {
            audioHitEnemy.play();
            hitAudioStop = true;
        }
        enemy.life -= 1;
        if (enemy.life > 0) {
            enemy.inJuryTween.start();
            return;
        }

        if (enemy.isDead || enemy.isJury) {
            return
        }
        enemy.DeadTween.start();

        killCount += 1;
        if (skillList.length < 3 && killCount >= point[skillList.length]) {
            killCount = 0;
            stopGame();
            showSkillPop();
        }
    }

    /**
     * @description: 监听计算器事件
     */
    function onTimeout() {
        const count = timeCount - 1 >= 10 ? timeCount -= 1 : '0' + (timeCount -= 1);
        timeoutText.text = `00:${count}`;
        if (timeCount <= 0) {
            game.time.events.remove(timeout);
            isGameEnd = true;
            return;
        }
        if (timeCount % 5 == 0) {
            trackGA(`坚持到${timeCount}秒`, '存活');
        }
        const number = game.time.totalElapsedSeconds().toFixed(0);
        // enemies.config.createNum = number ? number : 1;
        // if (timeCount >= 15 && timeCount != 30 && (timeCount % 5 == 0)) {
        //     stopGame();
        //     showSkillPop();
        // }
        if (timeCount === 20) {
            const enemyConfig2 = getConfig('enemyConfig2');
            enemies.config.createNum = enemyConfig2.createNum;
            enemies.config.moveSpeed = enemyConfig2.moveSpeed;
            enemies.config.createDis = enemyConfig2.createDis;
            enemies.config.life = enemyConfig2.life;
        }
        if (timeCount === 15) {
            // enemies.config.moveSpeed = 250;
            // enemies.config.createNum = 15;
            // enemies.config.createDis = 300;
            // enemies.config.life = 3;
        }
        if (timeCount === 10) {
            const enemyConfig3 = getConfig('enemyConfig3');
            enemies.config.createNum = enemyConfig3.createNum;
            enemies.config.moveSpeed = enemyConfig3.moveSpeed;
            enemies.config.createDis = enemyConfig3.createDis;
            enemies.config.life = enemyConfig3.life;
            // enemies.config.createDis = 50;
            // enemies.config.createNum = 30;
            // enemies.config.life = 3;
        }

    }

    /**
     * @description: 游戏结束
     */
    function gameEnd() {
        if (player.life > 0) {
            trackGA('坚持到0秒', '在线');
        } else {
            trackGA('血量归0', '断线');
        }
        isGameEnd = true;
        stopGame();
        showAwardPop();
        audioBg.stop();
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
     * @description: 开始游戏
     */
    function startGame() {
        player.start();
        enemies.start();
        timeout.timer.paused = false;
        isGameStop = false;
    }

    bindEvent();

    function bindEvent() {
        document.querySelector('.btn-skill1').addEventListener('click', (e) => {
            if (hadSkill('1')) {
                return;
            }
            skillList.push('1');
            e.target.classList.add('btn-skill-gray');
            player.addTornadoSkill();
            closePop();
        });
        document.querySelector('.btn-skill2').addEventListener('click', (e) => {
            if (hadSkill('2')) {
                return;
            }
            skillList.push('2');
            e.target.classList.add('btn-skill-gray');
            player.stopKnife = false;
            closePop();
        });
        document.querySelector('.btn-skill3').addEventListener('click', (e) => {
            if (hadSkill('3')) {
                return;
            }
            skillList.push('3');
            e.target.classList.add('btn-skill-gray');
            player.pet.visible = true;
            player.stopPetFire = false;
            closePop();
        });
        document.querySelector('.btn-reward').addEventListener('click', (e) => {
            trackGA('按钮的点击次数', '点击');
            e.stopPropagation();
        });
    }

    function hadSkill(skill) {
        return skillList.includes(skill);
    }

    function closePop() {
        document.querySelector('.pop').style.display = 'none';
        startGame();
    }

    function showSkillPop() {
        document.querySelector('.skill-pop').style.display = 'flex';
    }

    function showAwardPop() {
        document.querySelector('.award-pop').style.display = 'block';
    }
}