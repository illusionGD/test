class EnemyFactory {
    constructor() {
        this.config = {
            moveSpeed: 100,
            createDis: 1000,
            scale: 0.5,
            maxCount: 20
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

            enemy.body.velocity.x = x * this.config.moveSpeed;
            enemy.body.velocity.y = y * this.config.moveSpeed;
            if (x > 0) {
                enemy.animations.play('right');
            } else {
                enemy.animations.play('left');
            }
            // if (enemy.direction === 'left' && x > 0) {
            //     console.log(1);
            //     enemy.flipTween.start();
            //     enemy.direction = 'right';
            // }
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
                // 设置旋转锚点
                enemy.anchor.set(0.5, 1);
                // 重置碰撞体积宽高
                enemy.body.setSize(enemy.width, enemy.height);
                // 旋转动画
                enemy.shakeTween = game.add.tween(enemy).to({
                    rotation: 0.2
                }, 1000, Phaser.Easing.Cubic.In, true);
                enemy.shakeTween.yoyo(true);
                enemy.shakeTween.repeat();
                enemy.animations.add('left', [0], 5, true)
                enemy.animations.add('right', [1], 5, true)
                // 翻转动画
                // enemy.flipTween = game.add.tween(enemy).to({
                //     angle: 360
                // }, 100, Phaser.Easing.Cubic.In, true);
                // enemy.flipTween.pause();

                // 脚下阴影
                // enemy.footShadow = game.add.graphics();
                // // graphics.lineStyle(8, 0xffd900);
                // enemy.footShadow.beginFill(0x8e8e80);
                // enemy.footShadow.drawEllipse(x, y, enemy.width - 30, 5);
                // enemy.footShadow.endFill();
                // enemy.addChild(enemy.footShadow);
            }

            enemy.reset(x, y);
            // 检测边界碰撞并kill掉
            enemy.body.collideWorldBounds = true;
            this.lasTime = new Date().getTime();
        }
    }

    stop() {
        this.enemyGroup.forEachAlive(enemy => {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 0;
            enemy.shakeTween.pause();
        })
    }
}