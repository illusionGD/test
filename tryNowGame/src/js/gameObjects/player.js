class Player {
    constructor() {
        this.config = {
            moveSpeed: 200,
            bulletDis: 500,
            bulletSpeed: 500,
            tornadosRotationSpeed: 0.05
        }
        this.isDead = false;
        this.life = 1;
        this.fireTime = new Date().getTime();
        this.init()
    }

    init() {
        // 初始化角色对象
        this.initPlayer()

        // 初始化虚拟摇杆
        this.initVirtualJoystick()
    }

    /**
     * @description: 初始化角色
     */
    initPlayer() {
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, keyMap.player);
        game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

        // 设置角色与边界的碰撞
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;

        // 设置角色锚点为中心
        this.player.anchor.set(0.5, 0.5);

        // 角色动画相关
        this.animations = this.player.animations;
        this.animations.add('left', [0], 5, true);
        this.animations.add('right', [1], 5, true);
        this.animations.frame = 4;

        // 子弹组
        this.bullets = game.add.group();
        this.bullets.enableBody = true;

        // 技能骨骼动画


        this.isDead = false;
    }

    /**
     * @description: 初始化虚拟摇杆
     */
    initVirtualJoystick() {
        this.pad = game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addStick(game.world.centerX, game.world.centerY + 250, 200, keyMap.joystick);
        this.stick.scale = 0.8
    }

    /**
     * @description: 角色移动
     */
    run() {
        if (this.stick.isDown) {
            const v = game.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * this.config.moveSpeed, this.player.body.velocity);
            if (v.x > 0) {
                // this.player.rotation = Math.PI;
                this.animations.play('right')
            } else {
                // this.player.rotation = 0;
                this.animations.play('left')
            }
            this.fire();
        } else {
            this.stop();
            this.animations.frame = 4;
        }
    }

    /**
     * @description: 停止移动
     */
    stop() {
        this.animations.stop();
        this.player.body.velocity.set(0);
    }

    /**
     * @description: 角色射击
     */
    fire() {
        if (this.isDead) {
            return;
        }

        const dis = new Date().getTime() - this.fireTime;

        if (dis > this.config.bulletDis) {
            // 获取对象池中不存在的对象 && 重置子弹位置
            let bullet = this.bullets.getFirstExists(false);
            if (!bullet) {
                bullet = this.bullets.create(this.player.x, this.player.y, keyMap.playerBullet1)
            }
            bullet.reset(this.player.x, this.player.y)
            // 检测边界碰撞并kill掉
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;
            bullet.anchor.set(0.5, 0.5);
            if (this.player.frame <= 0) {
                bullet.direction = 'left';
                bullet.rotation = 0;
            } else {
                bullet.rotation = 3.14;
                bullet.direction = 'right'
            }

            this.fireTime = new Date().getTime();
        }

        // 子弹不断移动
        this.bullets.length && this.bullets.forEachAlive(bullet => {
            if (bullet.direction === 'left') {
                bullet.body.velocity.x = -this.config.bulletSpeed;
            } else {
                bullet.body.velocity.x = this.config.bulletSpeed;
            }
        })
    }

    /**
     * @description: 角色死亡
     */
    dead() {
        this.player.kill();
        this.isDead = true;
    }

    /**
     * @description: 受伤
     */
    injury() {
        this.life -= 1;
    }

    addTornadoSkill(num = 6) {
        this.tornados = game.add.group();
        this.tornados.enableBody = true;
        this.tornados.pivot.x = this.player.x;
        this.tornados.pivot.y = this.player.y;
        const angle = (2 * Math.PI) / num;
        const l = 200;

        for (let i = 0; i < num; i++) {
            const tornado = this.tornados.create(this.player.x, this.player.y, keyMap.tornado);
            const pointX = this.player.x + Math.sin(angle * i) * l;
            const pointY = this.player.y + Math.cos(angle * i) * l;
            tornado.scale.set(0.5, 0.5);
            tornado.anchor.set(0.5, 0.5);
            tornado.animations.add('create', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
            tornado.animations.add('rotation', [4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
            tornado.animations.play('rotation');
            // game.add.tween(tornado).to({
            //     rotation: tornado.rotation -= this.config.tornadosRotationSpeed
            // }, 1000, Phaser.Easing.Sinusoidal.Out, true);
            // // 扩散动画
            const tween = game.add.tween(tornado).to({
                x: pointX,
                y: pointY
            }, 1000, Phaser.Easing.Sinusoidal.Out, true);
            // tween.onComplete.addOnce(() => {
            //     tornado.animations.play('rotation');
            // })
            // tween.onUpdateCallback(() => {
            //     console.log(1);
            // })
        }

    }

    tornadosRotate() {
        if (this.tornados.stop) {
            return;
        }
        this.tornados.x = this.player.x;
        this.tornados.y = this.player.y;

        this.tornados.rotation += this.config.tornadosRotationSpeed;

        // 每个龙卷风自身旋转，保持直立状态
        this.tornados.forEachAlive(item => {
            item.rotation -= this.config.tornadosRotationSpeed
        })

    }
    stopTornadosRotate() {
        this.tornados.stop = true;
    }
}