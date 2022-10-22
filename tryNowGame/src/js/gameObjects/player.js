class Player {
    constructor() {
        this.config = {
            moveSpeed: 200,
            bulletDis: 500,
            bulletSpeed: 700,
            tornadosRotationSpeed: 0.04,
            tornadosCount: 6,
            checkScope: 100,
            petFireSpeed: 500,
            petFireDis: 100,
            petFireCount: 5,
            petFireCreateDis: 1000,
            knifeCount: 6,
            knifeCreateDis: 300,
            knifeSpeed: 500,
            curvature: 0.1
        }
        this.isDead = false;
        this.maxLife = 10;
        this.life = 10;
        this.fireTime = new Date().getTime();
        this.petFireTime = new Date().getTime();
        this.petFireCreateTime = new Date().getTime();
        this.knifeCreateTime = new Date().getTime();
        this.isPetFire = true;

        this.stopTornado = true;
        this.stopKnife = true;
        this.stopPetFire = true;
        // 记录火球当前连续发射到第几个
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
        // this.player.scale.set(scaleAdaptation(rem2px(40)), scaleAdaptation(rem2px(40)))
        game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.setSize(this.player.width, this.player.height);
        this.player.scale.set(0.7, 0.7);

        // 设置角色与边界的碰撞
        this.player.body.immovable = true;
        this.player.body.collideWorldBounds = true;
        this.addPet();
        this.pet.visible = false;

        // 设置角色锚点为中心
        this.player.anchor.set(0.5, 0.5);
        // 角色动画相关
        const tween = game.add.tween(this.player).to({
            height: this.player.height / 1.2,
            width: this.player.width * 1.2
        }, 200, Phaser.Easing.Sinusoidal.Out, true);
        tween.yoyo(true);
        tween.repeat();

        this.animations = this.player.animations;
        this.animations.add('left', [0], 5, true);
        this.animations.add('right', [1], 5, true);
        this.animations.frame = 4;

        // 子弹组
        this.bullets = game.add.group();
        this.bullets.enableBody = true;

        // 初始化血条
        this.blood = game.add.graphics();
        this.player.addChild(this.blood);
        this.drawBlood(this.player.width);

        // 飞刀组
        this.KnifeGroup = game.add.group();
        this.KnifeGroup.enableBody = true;

        // 龙卷风组
        this.tornados = game.add.group();
        this.tornados.enableBody = true;

        this.isDead = false;
    }

    /**
     * @description: 初始化虚拟摇杆
     */
    initVirtualJoystick() {
        this.pad = game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addStick(game.world.centerX, game.world.centerY + rem2px(3), 200, keyMap.joystick);
        this.stick.scale = scaleAdaptation(247);
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

    start() {
        this.animations.play();
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
                bullet.scale.set(0.5, 0.5);
                bullet.anchor.set(0.5, 0.5);
                bullet.body.setSize(bullet.width, bullet.height)
                // bullet.animations.add('move', [0, 1, 2, 3, 4], 10, true)
                // bullet.animations.play('move');
            }

            bullet.reset(this.player.x, this.player.y);
            // 检测边界碰撞并kill掉
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;
            bullet.vector = null;
            if (dir === 'right') {
                bullet.direction = 'right';
                bullet.rotation = 3.14;
            } else {
                bullet.rotation = 0;
                bullet.direction = 'left'
            }
            if (target) {
                bullet.vector = computeVector(target.position.x, target.position.y, bullet.position.x, bullet.position.y);
                bullet.rotation = computeRotation(target.position.x, target.position.y, bullet.position.x, bullet.position.y) + Math.PI;
            }
            this.fireTime = new Date().getTime();
        }

        // 子弹不断移动
        this.bullets.length && this.bullets.forEachAlive(bullet => {
            if (bullet.vector) {
                bullet.body.velocity.x = bullet.vector.x * this.config.bulletSpeed;
                bullet.body.velocity.y = bullet.vector.y * this.config.bulletSpeed;
            } else {
                if (bullet.direction === 'left') {
                    bullet.body.velocity.x = -this.config.bulletSpeed;
                } else {
                    bullet.body.velocity.x = this.config.bulletSpeed;
                }
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

    addTornadoSkill() {
        this.stopTornado = false;
        this.tornados.pivot.x = this.player.x;
        this.tornados.pivot.y = this.player.y;
        const angle = (2 * Math.PI) / this.config.tornadosCount;
        const l = rem2px(2);

        for (let i = 0; i < this.config.tornadosCount; i++) {
            const tornado = this.tornados.create(this.player.x, this.player.y, keyMap.tornado);
            const pointX = this.player.x + Math.sin(angle * i) * l;
            const pointY = this.player.y + Math.cos(angle * i) * l;
            tornado.scale.set(0.3, 0.3);
            tornado.anchor.set(0.5, 0.5);
            tornado.animations.add('rotation', null, 25, true);
            tornado.animations.play('rotation');

            // 扩散动画
            const tween = game.add.tween(tornado).to({
                x: pointX,
                y: pointY
            }, 1000, Phaser.Easing.Sinusoidal.Out, true);

        }

    }

    tornadosRotate() {
        if (!this.tornados || this.stopTornado) {
            return;
        }
        this.tornados.x = this.player.x;
        this.tornados.y = this.player.y;

        this.tornados.rotation += this.config.tornadosRotationSpeed;

        // 每个龙卷风自身旋转，保持直立状态
        this.tornados.forEachAlive(item => {
            item.rotation -= this.config.tornadosRotationSpeed;
        });
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
    petFire() {
        if (this.stopPetFire && !this.pet.visible) {
            return;
        }
        const dis = new Date().getTime() - this.petFireTime;
        const dir = this.player.direction;

        if (!this.isPetFire && new Date().getTime() - this.petFireCreateTime > this.config.petFireCreateDis) {
            this.isPetFire = true;
            this.petFireCreateTime = new Date().getTime();
        }

        if (this.isPetFire && dis > this.config.petFireDis) {
            var fireBall = this.pet.fireGroup.getFirstExists(false);
            const angle = (((2 * Math.PI) / this.config.petFireCount) * this.petFireCount).toFixed(2);
            if (!fireBall) {
                fireBall = this.pet.fireGroup.create(0, 0, keyMap.fireBall);
                fireBall.animations.add('mover', [0, 1, 2, 3, 4], 25, true)
                fireBall.animations.play('mover');
                fireBall.scale.set(0.3, 0.3);
                fireBall.anchor.set(0.5, 0.5)
                fireBall.body.setSize(fireBall.width, fireBall.height);
            }
            fireBall.reset(this.pet.world.x + this.pet.width / 2, this.pet.world.y + this.pet.height / 2);
            fireBall.anchor.set(0.5, 0.5);

            fireBall.vector = {
                angle,
                x: Math.sin(angle) * 1,
                y: Math.cos(angle) * 1
            }
            this.petFireTime = new Date().getTime();


            if (angle == 0) {
                fireBall.rotation = Math.PI / 2;
            } else {
                fireBall.rotation = ((2 * Math.PI) / this.config.petFireCount) * (-this.petFireCount + 1);
            }
            fireBall.body.velocity.x = fireBall.vector.x * this.config.petFireSpeed;
            fireBall.body.velocity.y = fireBall.vector.y * this.config.petFireSpeed;
            // 检测边界碰撞并kill掉
            fireBall.checkWorldBounds = true;
            fireBall.outOfBoundsKill = true;
            if (dir === 'right') {
                fireBall.direction = 'right'
            } else {
                fireBall.direction = 'left'
            }
            this.petFireCount += 1;
            if (this.petFireCount >= this.config.petFireCount) {
                this.isPetFire = false;
                this.petFireCount = 0;
            }
        }
    }

    /**
     * @description: 添加飞刀技能
     */
    fireKnife() {
        if (this.stopKnife) {
            return;
        }
        const dis = new Date().getTime() - this.knifeCreateTime;
        const rotation = (Math.PI) / this.config.knifeCount;
        if (dis > this.config.knifeCreateDis) {
            for (let i = 0; i < this.config.knifeCount; i++) {
                var knife = this.KnifeGroup.getFirstExists(false);
                if (!knife) {
                    knife = this.KnifeGroup.create(this.player.x, this.player.y, keyMap.knife);
                    // knife.setAnimationByName(0, keyMap.knifeRotation, true);
                    knife.scale.set(0.2, 0.2);
                    knife.animations.add('rotation', [0, 1, 2, 3, 4], 45, true);
                    knife.animations.play('rotation');
                    knife.body.setSize(knife.width, knife.height)
                    knife.checkWorldBounds = true;
                    knife.outOfBoundsKill = true;

                    // 检测边界碰撞并kill掉
                    knife.checkWorldBounds = true;
                    knife.outOfBoundsKill = true;
                }
                knife.reset(this.player.x, this.player.y);
                // console.log(justQuadrant(this.stick.rotation));
                // const quadrant = justQuadrant(this.stick.rotation);
                var angle = rotation * i;
                // if (quadrant === 1) {
                //     angle = rotation * i + this.stick.rotation
                // }
                knife.body.velocity.x = Math.sin(angle + this.stick.rotation) * this.config.knifeSpeed
                knife.body.velocity.y = Math.cos(angle + this.stick.rotation - Math.PI) * this.config.knifeSpeed
            }
            this.knifeCreateTime = new Date().getTime();
        }
    }

    /**
     * @description: 画血条
     * @param {*} width
     */
    drawBlood(width) {
        const x = -this.player.width / 2;
        const y = this.player.height / 2 + 10;
        const h = 8;
        const lineColor = 0xFFFFFF;
        const bloodColor = 0x00FF00;
        this.blood.clear()
        this.blood.beginFill(bloodColor, 1);
        this.blood.lineStyle(0);
        this.blood.drawRect(x, y, width, h);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x, y);
        this.blood.lineTo(x + this.player.width, y);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x + this.player.width, y);
        this.blood.lineTo(x + this.player.width, y + h);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x + this.player.width, y + h);
        this.blood.lineTo(x, y + h);

        this.blood.lineStyle(2, lineColor, 1);
        this.blood.moveTo(x, y + h);
        this.blood.lineTo(x, y + 0);

        this.blood.endFill();
    }
}