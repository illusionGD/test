class EnemyFactory {
    constructor() {
        this.config = {
            moveSpeed: 100,
            createDis: 500,
            scale: 0.5,
            maxCount: 5
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
    createEnemy(x, y) {
        const dis = new Date().getTime() - this.lasTime;

        if (dis > this.config.createDis && this.config.maxCount > this.enemyGroup.total) {
            let enemy = this.enemyGroup.getFirstExists(false);
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
                enemy.DeadTween = game.add.tween(enemy).to({}, 500, Phaser.Easing.Cubic.In, false);
                enemy.DeadTween.onComplete.add(function () {
                    enemy.kill();
                });
                enemy.DeadTween.onStart.add(function () {
                    enemy.shakeTween.stop();
                    enemy.frame = enemy.frame === 1 ? 0 : 3;
                    enemy.isDead = true;
                })
            }

            this.resetEnemy(enemy, x, y);
            this.lasTime = new Date().getTime();
        }
    }

    resetEnemy(enemy, x, y) {
        enemy.isDead = false;
        enemy.shakeTween.start();
        enemy.frame = 1;
        enemy.reset(x, y);
        // 检测边界碰撞并kill掉
        enemy.body.collideWorldBounds = true;
    }

    stop() {
        this.enemyGroup.forEachAlive(enemy => {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 0;
            enemy.shakeTween.pause();
        })
    }
}