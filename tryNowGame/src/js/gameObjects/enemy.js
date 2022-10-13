class EnemyFactory {
    constructor() {
        this.config = {
            moveSpeed: 50,
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
            } = utils.computeDistance(targetX, targetY, enemy.x, enemy.y);

            enemy.body.velocity.x = x * this.config.moveSpeed
            enemy.body.velocity.y = y * this.config.moveSpeed
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
                enemy.scale.set(this.config.scale, this.config.scale);
                enemy.body.setSize(enemy.width, enemy.height)
            }

            enemy.reset(x, y);
            // 检测边界碰撞并kill掉
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;
            this.lasTime = new Date().getTime();
        }
    }

    stop() {
        this.enemyGroup.forEachAlive(enemy => {
            enemy.body.velocity.x = 0
            enemy.body.velocity.y = 0
        })
    }
}