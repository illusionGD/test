class Player {
    constructor() {
        this.config = {
            moveSpeed: 200,
            bulletDis: 500,
            bulletSpeed: 500,
            tornadosRotationSpeed: 0.05,
            tornadosCount: 6,
            checkScope: 100,
            petFireSpeed: 200,
            petFireDis: 100,
            curvature: 0.1
        }
        this.isDead = false;
        this.maxLife = 10;
        this.life = 10;
        this.fireTime = new Date().getTime();
        this.petFireTime = new Date().getTime();
        this.petFireCount = 0;
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

        // 初始化血条
        this.blood = game.add.graphics();
        this.player.addChild(this.blood)
        this.drawBlood(this.player.width)

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
                this.pet.frame = 1;
                this.animations.play('right');
                this.player.direction = 'right';
            } else {
                this.pet.frame = 0;
                this.animations.play('left');
                this.player.direction = 'left';
            }

        } else {
            this.stop();
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
    fire(target) {
        if (this.isDead) {
            return;
        }
        const dir = this.player.direction;
        const dis = new Date().getTime() - this.fireTime;

        if (dis > this.config.bulletDis) {
            // 获取对象池中不存在的对象 && 重置子弹位置
            let bullet = this.bullets.getFirstExists(false);
            if (!bullet) {
                bullet = this.bullets.create(this.player.x, this.player.y, keyMap.gun);
                bullet.scale.set(0.7, 0.7);
                bullet.anchor.set(0.5, 0.5);
                // bullet.animations.add('move', [0, 1, 2, 3, 4], 10, true)
                // bullet.animations.play('move');
                bullet.body.setSize(0.7, 0.7)
            }
            bullet.reset(this.player.x, this.player.y)
            // 检测边界碰撞并kill掉
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;
            if (dir === 'right') {
                bullet.direction = 'right';
                bullet.rotation = 3.14;
            } else {
                bullet.rotation = 0;
                bullet.direction = 'left'
            }

            this.fireTime = new Date().getTime();
        }

        // 子弹不断移动
        this.bullets.length && this.bullets.forEachAlive(bullet => {
            if (target) {
                game.physics.arcade.accelerateToObject(bullet, target.position, this.config.bulletSpeed * 10)
            } else {}
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
        const len = (this.life / this.maxLife) * this.player.width;
        this.drawBlood(len);
    }

    // addTornadoSkill(num = 6) {
    //     this.tornados = game.add.group();
    //     this.tornados.enableBody = true;
    //     this.tornados.pivot.x = this.player.x;
    //     this.tornados.pivot.y = this.player.y;
    //     const angle = (2 * Math.PI) / num;
    //     const l = 200;

    //     for (let i = 0; i < num; i++) {
    //         const tornado = this.tornados.create(this.player.x, this.player.y, keyMap.tornado);
    //         const pointX = this.player.x + Math.sin(angle * i) * l;
    //         const pointY = this.player.y + Math.cos(angle * i) * l;
    //         tornado.scale.set(0.5, 0.5);
    //         tornado.anchor.set(0.5, 0.5);
    //         tornado.animations.add('create', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    //         tornado.animations.add('rotation', [4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    //         tornado.animations.play('rotation');
    //         // game.add.tween(tornado).to({
    //         //     rotation: tornado.rotation -= this.config.tornadosRotationSpeed
    //         // }, 1000, Phaser.Easing.Sinusoidal.Out, true);
    //         // // 扩散动画
    //         const tween = game.add.tween(tornado).to({
    //             x: pointX,
    //             y: pointY
    //         }, 1000, Phaser.Easing.Sinusoidal.Out, true);
    //         // tween.onComplete.addOnce(() => {
    //         //     tornado.animations.play('rotation');
    //         // })
    //         // tween.onUpdateCallback(() => {
    //         //     console.log(1);
    //         // })
    //     }

    // }

    addTornadoSkill() {
        this.tornados = game.add.group();
        this.tornados.enableBody = true;
        this.tornados.pivot.x = this.player.x;
        this.tornados.pivot.y = this.player.y;
        const angle = (2 * Math.PI) / this.config.tornadosCount;
        const l = 200;
        // return;
        for (let i = 0; i < this.config.tornadosCount; i++) {
            const tornado = game.add.spine(this.player.x, this.player.y, keyMap.tornado);
            this.tornados.add(tornado);

            tornado.setAnimationByName(0, keyMap.tornadoRotation, true);
            tornado.scale.set(0.05, 0.05);
            // tornado.enableBodyDebug = true;
            tornado.body = null;
            // tornado.enableBody = true;
            // tornado.body = new Phaser.Physics.Arcade.Body(tornado);
            // console.log(tornado instanceof tornado.children[0].children[0]);
            // console.log(tornado instanceof Phaser.Group);
            game.physics.enable(tornado, Phaser.Physics.ARCADE)
            // tornado.debug = true;
            console.log(tornado);
            const pointX = this.player.x + Math.sin(angle * i) * l;
            const pointY = this.player.y + Math.cos(angle * i) * l;
            // tornado.scale.set(0.5, 0.5);
            // tornado.anchor.set(0.5, 0.5);
            // tornado.animations.add('create', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
            // tornado.animations.add('rotation', [4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
            // tornado.animations.play('rotation');
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

    /**
     * @description: 增加宠物
     */
    addPet() {
        this.pet = game.add.image(-this.player.width / 2 - 10, -this.player.height / 2 - 10, keyMap.pet);
        this.pet.anchor.set(0.5, 0.5);
        this.pet.scale.set(0.2, 0.2);
        this.pet.fireGroup = game.add.group();
        this.pet.fireGroup.enableBody = true;
        const tween = game.add.tween(this.pet).to({
            y: this.pet.world.y - 20
        }, 1000, Phaser.Easing.Linear.In, true);
        tween.yoyo(true);
        tween.repeat();
        this.player.addChild(this.pet);
    }

    /**
     * @description: 宠物攻击
     */
    petFire(target) {
        const dis = new Date().getTime() - this.petFireTime;
        const dir = this.player.direction;
        // 记录目标坐标
        if (target && this.pet.fireGroup.total === 0) {
            this.pet.fireGroup.targetPoint = {
                x: target.position.x,
                y: target.position.y
            };
            this.isPetFire = true;
        }

        if (this.isPetFire && dis > this.config.petFireDis) {
            var fireBall = this.pet.fireGroup.getFirstExists(false);

            if (!fireBall) {
                fireBall = this.pet.fireGroup.create(0, 0, keyMap.fireBall);
                fireBall.animations.add('mover', [0, 1, 2, 3, 4], 10, true)
                fireBall.animations.play('mover');
                fireBall.scale.set(0.12, 0.12);
                fireBall.anchor.set(0.5, 0.5)
                fireBall.body.setSize(0.12, 0.12);
            }
            this.petFireTime = new Date().getTime();

            const direction = this.pet.fireGroup.getChildIndex(fireBall) % 2 ? -1 : 1;
            fireBall.leap = 0;
            fireBall.reset(this.pet.world.x + this.pet.width / 2, this.pet.world.y + this.pet.height / 2);
            fireBall.originP = {
                x: fireBall.x,
                y: fireBall.y
            }
            fireBall.controlP = {
                x: fireBall.x + direction * 50,
                y: fireBall.y + 50
            }
            // 检测边界碰撞并kill掉
            fireBall.checkWorldBounds = true;
            fireBall.outOfBoundsKill = true;
            if (dir === 'right') {
                fireBall.direction = 'right'
            } else {
                fireBall.direction = 'left'
            }
            this.petFireCount += 1;
            if (this.petFireCount >= 10) {
                this.isPetFire = false;
                this.petFireCount = 0;
            }
        }

        // 子弹不断移动
        this.pet.fireGroup.length && this.pet.fireGroup.forEachAlive((fireBall, index) => {

            if (fireBall.x >= this.pet.fireGroup.targetPoint.x - 5 && fireBall.x <= this.pet.fireGroup.targetPoint.x + 5) {
                fireBall.kill();
                return;
            }
            if (this.pet.fireGroup.targetPoint) {
                const targetX = this.pet.fireGroup.targetPoint.x;
                const targetY = this.pet.fireGroup.targetPoint.y;
                const {
                    x,
                    y
                } = quad(fireBall.leap, fireBall.originP, fireBall.controlP, this.pet.fireGroup.targetPoint);
                fireBall.x = x;
                fireBall.y = y;
                fireBall.leap += (this.config.petFireSpeed / 10000);

                // 选择角度
                fireBall.rotation = computeRotation(targetX, targetY, fireBall.world.x, fireBall.world.y)
            } else {
                if (fireBall.direction === 'left') {
                    fireBall.rotation = 3.14;
                    fireBall.body.velocity.x = -this.config.petFireSpeed;
                } else {
                    fireBall.body.velocity.x = this.config.petFireSpeed;
                    fireBall.rotation = 0;
                }
            }
        });
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

    /**
     * @description: 画血条
     * @param {*} width
     */
    drawBlood(width) {
        const x = -this.player.width / 2;
        const y = this.player.height / 2;
        const lineColor = 0xFFFFFF;
        const bloodColor = 0x00FF00;
        this.blood.clear()
        this.blood.beginFill(bloodColor, 1);
        this.blood.lineStyle(0);
        this.blood.drawRect(x, y, width, 10);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x, y);
        this.blood.lineTo(x + this.player.width, y);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x + this.player.width, y);
        this.blood.lineTo(x + this.player.width, y + 10);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x + this.player.width, y + 10);
        this.blood.lineTo(x, y + 10);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x, y + 10);
        this.blood.lineTo(x, y + 0);

        this.blood.endFill();
    }
}