class EnemyFactory {
    constructor() {
        this.config = {
            moveSpeed: 100,
            createDis: 500,
            createNum: 1,
            maxCount: 100,
            life: 1,
            juryTime: 500,
            deadTime: 200,
        }

        this.lasTime = new Date().getTime();
        this.init();
    }

    init() {
        this.isDead = false;
        this.enemyGroup = game.add.group();
        this.enemyGroup.enableBody = true;
    }

    /**
     * @description: 敌人移动
     */
    move(targetX = 0, targetY = 0) {
        this.enemyGroup.forEachAlive(enemy => {
            const {
                x,
                y
            } = computeVector(targetX, targetY, enemy.x, enemy.y);
            if (!enemy.isDead) {
                enemy.body.velocity.x = x * this.config.moveSpeed;
                enemy.body.velocity.y = y * this.config.moveSpeed;
                if (x > 0) {
                    enemy.frame = 2
                } else {
                    enemy.frame = 1
                }
            } else {
                enemy.body.velocity.x = x / 2 * -this.config.moveSpeed;
                enemy.body.velocity.y = 0;
            }
        })
    }

    /**
     * @description: 创建敌人
     */
    createEnemy(playerX, playerY) {
        const dis = new Date().getTime() - this.lasTime;
        if (dis > this.config.createDis && this.config.maxCount > this.enemyGroup.total) {
            const maxX = (playerX + rem2px(1));
            const minX = (playerX - rem2px(1));
            const maxY = (playerY + rem2px(1));
            const minY = (playerY - rem2px(1));

            for (let i = 0; i < this.config.createNum; i++) {
                let x = game.camera.position.x - (game.camera.width / 2) + Math.random() * game.camera.width;
                let y = game.camera.position.y - (game.camera.height / 2) + Math.random() * game.camera.height;
                let enemy = this.enemyGroup.getFirstExists(false);

                if (x < maxX && x > minX) {
                    x = maxX
                }
                if (y < maxY && y > minY) {
                    y = minY
                }
                if (!enemy) {
                    enemy = this.enemyGroup.create(x, y, keyMap.enemy);
                    enemy.scale.set(0.6, 0.6);
                    // 设置旋转锚点
                    enemy.anchor.set(0.5, 1);
                    // 重置碰撞体积宽高
                    enemy.body.setSize(enemy.width, enemy.height);
                    // 旋转动画
                    enemy.shakeTween = game.add.tween(enemy).to({
                        rotation: 0.2
                    }, 1000, Phaser.Easing.Cubic.In, true, 0, -1, true);
                    // 死亡动画
                    enemy.DeadTween = game.add.tween(enemy).to({}, this.config.deadTime, Phaser.Easing.Cubic.In, false);
                    enemy.DeadTween.onComplete.add(function () {
                        enemy.kill();
                    });
                    enemy.DeadTween.onStart.add(function () {
                        enemy.isDead = true;
                        enemy.shakeTween.stop();
                        enemy.tint = 0xffffff;
                        enemy.frame = enemy.frame === 1 ? 0 : 3;
                    });
                    // 受伤动画
                    enemy.inJuryTween = game.add.tween(enemy).to({}, this.config.juryTime, Phaser.Easing.Cubic.In, false);
                    enemy.inJuryTween.onComplete.add(function () {
                        enemy.isJury = false;
                        enemy.tint = 0xffffff;
                    });
                    enemy.inJuryTween.onStart.add(function () {
                        enemy.isJury = true;
                        enemy.tint = 0xDC143C;
                    });

                    // 检测边界碰撞并kill掉
                    enemy.body.collideWorldBounds = true;
                }
                enemy.life = this.config.life;
                this.resetEnemy(enemy, x, y);
            }

            this.lasTime = new Date().getTime();
        }
    }

    resetEnemy(enemy, x, y) {
        enemy.isDead = false;
        enemy.isJury = false;
        enemy.shakeTween.start();
        enemy.frame = 1;
        enemy.tint = 0xffffff;
        enemy.reset(x, y);
    }

    stop() {
        this.enemyGroup.forEachAlive(enemy => {
            enemy.body.velocity.set(0);
            enemy.shakeTween.pause();
        })
    }

    start() {
        this.enemyGroup.forEachAlive(enemy => {
            enemy.shakeTween.start();
        })
    }
}