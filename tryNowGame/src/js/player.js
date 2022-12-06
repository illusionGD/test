class Player {
    constructor(x, y) {
        const roleConfig = getConfig('roleConfig');
        const tornadoConfig = getConfig('tornadoConfig');
        const fireConfig = getConfig('fireConfig');
        const knifeConfig = getConfig('knifeConfig');
        const axConfig = getConfig('axConfig');
        this.config = {
            moveSpeed: 200,
            scaleAnTime: 400,
            bulletDis: 500,
            bulletSpeed: 700,
            tornadosRotationSpeed: 0.04,
            tornadosCount: 6,
            petFireSpeed: 500,
            petFireDis: 100,
            petFireCount: 5,
            petFireCreateDis: 1000,
            knifeCount: 6,
            knifeCreateDis: 300,
            knifeSpeed: 500,
            roleScale: 0.7,
            tornadoScale: 0.3,
            fireScale: 0.2,
            knifeScale: 0.2,
            stickY: 2.5,
            axRotateSpeed: 0.3,
            axTimeDis: 500,
            axContinuedTime: 3000,
            axScale: 0.2,
            ...roleConfig,
            ...tornadoConfig,
            ...fireConfig,
            ...knifeConfig,
            ...axConfig
        }

        this.isDead = false;
        this.maxLife = this.config.life;
        this.life = this.config.life;
        this.fireTime = new Date().getTime();
        this.petFireTime = new Date().getTime();
        this.petFireCreateTime = new Date().getTime();
        this.knifeCreateTime = new Date().getTime();
        this.axTime = new Date().getTime();
        this.axLastTime = new Date().getTime();
        this.isPetFire = true;

        this.stopTornado = true;
        this.stopKnife = true;
        this.stopPetFire = true;
        this.stopAx = true;

        this.audioAxStop = true;
        // 记录火球当前连续发射到第几个
        this.petFireCount = 0;
        this.init(x, y);
    }

    init(x, y) {
        // 初始化角色对象
        this.initPlayer(x, y);

        // 初始化虚拟摇杆
        this.initVirtualJoystick();
    }

    /**
     * @description: 初始化角色
     */
    initPlayer(x, y) {
        this.player = game.add.sprite(x, y, keyMap.player);
        game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.setSize(this.player.width, this.player.height);
        this.player.scale.set(this.config.roleScale, this.config.roleScale);

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
        }, this.config.scaleAnTime, Phaser.Easing.Sinusoidal.Out, true);
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
        // this.tornados = game.add.group();
        // this.tornados.enableBody = true;
        // 初始化音效
        // this.audioArrow = game.add.audio(keyMap.audioArrow, 1);
        this.audioKnife = game.add.audio(keyMap.audioKnife, 1);
        this.audioFire = game.add.audio(keyMap.audioFire, 1);
        this.audioAx = game.add.audio(keyMap.audioAx, 1);
        const ax = game.add.sprite(this.player.x, this.player.y, keyMap.ax);

        this.ax = ax;
        game.physics.arcade.enableBody(this.ax);
        this.ax.visible = false;
        this.ax.body.setSize(this.ax.width - rem2px(2), this.ax.height - rem2px(2));
        ax.anchor.set(0.5, 0.5);
        ax.scale.set(this.config.axScale, this.config.axScale);

        this.isDead = false;
    }

    /**
     * @description: 初始化虚拟摇杆
     */
    initVirtualJoystick() {
        this.pad = game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addStick(game.world.centerX, game.world.centerY + rem2px(this.config.stickY), 200, keyMap.joystick);
        this.stick.scale = scaleAdaptation(rem2px(6));
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
            // this.audioArrow.play();
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

    // addTornadoSkill() {
    //     this.stopTornado = false;
    //     this.tornados.pivot.x = this.player.x;
    //     this.tornados.pivot.y = this.player.y;
    //     const angle = (2 * Math.PI) / this.config.tornadosCount;
    //     const l = rem2px(2);

    //     for (let i = 0; i < this.config.tornadosCount; i++) {
    //         const tornado = this.tornados.create(this.player.x, this.player.y, keyMap.tornado);
    //         const pointX = this.player.x + Math.sin(angle * i) * l;
    //         const pointY = this.player.y + Math.cos(angle * i) * l;
    //         tornado.scale.set(this.config.tornadoScale, this.config.tornadoScale);
    //         tornado.anchor.set(0.5, 0.5);
    //         tornado.animations.add('rotation', null, 25, true);
    //         tornado.animations.play('rotation');

    //         // 扩散动画
    //         const tween = game.add.tween(tornado).to({
    //             x: pointX,
    //             y: pointY
    //         }, 1000, Phaser.Easing.Sinusoidal.Out, true);

    //     }
    //     this.audioTornado.play();
    // }

    // tornadosRotate() {
    //     if (!this.tornados || this.stopTornado) {
    //         return;
    //     }
    //     this.tornados.x = this.player.x;
    //     this.tornados.y = this.player.y;

    //     this.tornados.rotation += this.config.tornadosRotationSpeed;

    //     // 每个龙卷风自身旋转，保持直立状态
    //     this.tornados.forEachAlive(item => {
    //         item.rotation -= this.config.tornadosRotationSpeed;
    //     });
    // }

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
    // petFire() {
    //     if (this.stopPetFire && !this.pet.visible) {
    //         return;
    //     }
    //     const dis = new Date().getTime() - this.petFireTime;
    //     const dir = this.player.direction;

    //     if (!this.isPetFire && new Date().getTime() - this.petFireCreateTime > this.config.petFireCreateDis) {
    //         this.isPetFire = true;
    //         this.petFireCreateTime = new Date().getTime();
    //     }

    //     if (this.isPetFire && dis > this.config.petFireDis) {
    //         var fireBall = this.pet.fireGroup.getFirstExists(false);
    //         const angle = (((2 * Math.PI) / this.config.petFireCount) * this.petFireCount).toFixed(2);
    //         if (!fireBall) {
    //             fireBall = this.pet.fireGroup.create(0, 0, keyMap.fireBall);
    //             fireBall.animations.add('mover', [0, 1, 2, 3, 4], 25, true)
    //             fireBall.animations.play('mover');
    //             fireBall.scale.set(this.config.fireScale, this.config.fireScale);
    //             fireBall.anchor.set(0.5, 0.5);
    //             fireBall.body.setSize(fireBall.width, fireBall.height);
    //         }
    //         let x = this.pet.world.x + this.pet.width / 2;
    //         let y = this.pet.world.y + this.pet.height / 2;
    //         if (this.pet.world.x == Math.abs(game.camera.world.x)) {
    //             x = this.player.world.x - this.player.width / 2 - 10;
    //             y = this.player.world.y - this.player.height / 2 - 10;
    //         }

    //         fireBall.reset(x, y);

    //         fireBall.vector = {
    //             angle,
    //             x: Math.sin(angle) * 1,
    //             y: Math.cos(angle) * 1
    //         }
    //         this.petFireTime = new Date().getTime();

    //         if (angle == 0) {
    //             fireBall.rotation = Math.PI / 2;
    //         } else {
    //             fireBall.rotation = ((2 * Math.PI) / this.config.petFireCount) * (-this.petFireCount + 1);
    //         }
    //         fireBall.body.velocity.x = fireBall.vector.x * this.config.petFireSpeed;
    //         fireBall.body.velocity.y = fireBall.vector.y * this.config.petFireSpeed;
    //         // 检测边界碰撞并kill掉
    //         fireBall.checkWorldBounds = true;
    //         fireBall.outOfBoundsKill = true;
    //         if (dir === 'right') {
    //             fireBall.direction = 'right'
    //         } else {
    //             fireBall.direction = 'left'
    //         }
    //         this.audioFire.play();

    //         this.petFireCount += 1;
    //         if (this.petFireCount >= this.config.petFireCount) {
    //             this.isPetFire = false;
    //             this.petFireCount = 0;
    //         }
    //     }
    // }

    petFire() {
        if (this.stopPetFire && !this.pet.visible) {
            return;
        }
        const dis = new Date().getTime() - this.petFireTime;
        const rotation = (Math.PI) / this.config.petFireCount;

        if (dis > this.config.petFireCreateDis) {
            for (let i = 0; i < this.config.petFireCount; i++) {

                var fireBall = this.pet.fireGroup.getFirstExists(false);
                if (!fireBall) {
                    fireBall = this.pet.fireGroup.create(0, 0, keyMap.fireBall);
                    fireBall.animations.add('mover', [0, 1, 2, 3], 25, true)
                    fireBall.animations.play('mover');
                    fireBall.scale.set(this.config.fireScale, this.config.fireScale);
                    fireBall.anchor.set(0.5, 0.5);
                    fireBall.body.setSize(fireBall.width - rem2px(0.3), fireBall.height);
                    // 检测边界碰撞并kill掉
                    fireBall.checkWorldBounds = true;
                    fireBall.outOfBoundsKill = true;

                }
                let x = this.pet.world.x + this.pet.width / 2;
                let y = this.pet.world.y + this.pet.height / 2;
                if (this.pet.world.x == Math.abs(game.camera.world.x)) {
                    x = this.player.world.x - this.player.width / 2 - 10;
                    y = this.player.world.y - this.player.height / 2 - 10;
                }
                fireBall.reset(x, y);

                const angle = rotation * i;
                fireBall.body.velocity.x = Math.sin(angle + this.stick.rotation) * this.config.petFireSpeed
                fireBall.body.velocity.y = Math.cos(angle + this.stick.rotation - Math.PI) * this.config.petFireSpeed

                fireBall.rotation = computeRotation(0, 0, fireBall.body.velocity.x, fireBall.body.velocity.y) + Math.PI;
            }

            this.audioFire.play();
            this.petFireTime = new Date().getTime();
        }
    }

    axRotate() {
        const dis = new Date().getTime() - this.axTime;

        if (this.stopAx || dis < this.config.axTimeDis) {
            this.axLastTime = new Date().getTime();
            return
        }
        if (!this.audioAxStop) {
            this.audioAx.play('', 0.2);
            this.audioAxStop = true;
        }
        this.ax.visible = true;
        this.ax.body.enable = true;

        const dis2 = new Date().getTime() - this.axLastTime;

        if (dis2 <= this.config.axContinuedTime) {
            this.ax.rotation += this.config.axRotateSpeed;
            this.ax.x = this.player.x;
            this.ax.y = this.player.y;
        } else {
            this.ax.visible = false;
            this.ax.body.enable = false;
            this.audioAxStop = false;
            this.axTime = new Date().getTime();
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
                    knife.scale.set(this.config.knifeScale, this.config.knifeScale);
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

                var angle = rotation * i;

                knife.body.velocity.x = Math.sin(angle + this.stick.rotation) * this.config.knifeSpeed
                knife.body.velocity.y = Math.cos(angle + this.stick.rotation - Math.PI) * this.config.knifeSpeed
            }
            this.audioKnife.play();
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