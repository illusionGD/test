const screenW = parseInt(window.getComputedStyle(document.getElementById('game')).width);
const screenH = document.documentElement.clientHeight
const game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'game');
const scaleVal = screenW / 240 > screenH / 400 ? screenW / 240 : screenH / 400

const gameConfig = {
    planeFireDis: 500,
    enemyFireDis: 1000,
    enemyCreateDis: 1000,
    enemyMoveSpeed: 20,
    enemyBulletSpeed: 30,
    planeBulletSpeed: 200
}

let num = 0;
let audios;
game.States = {}

game.States.boot = function () {
    this.preload = function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.image('loading', './assets/plane/preloader.gif');
    }
    this.create = function () {
        game.state.start('preload');
    }
}

game.States.preload = function () {
    this.preload = function () {
        var preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg', './assets/plane/bg.jpg');
        game.load.image('copyright', './assets/plane/copyright.png');
        game.load.spritesheet('myplane', './assets/plane/myplane.png', 40, 40, 4);
        game.load.spritesheet('startbutton', './assets/plane/startbutton.png', 100, 40, 2);
        game.load.spritesheet('replaybutton', './assets/plane/replaybutton.png', 80, 30, 2);
        game.load.spritesheet('sharebutton', './assets/plane/sharebutton.png', 80, 30, 2);
        game.load.image('mybullet', './assets/plane/mybullet.png');
        game.load.image('bullet', './assets/plane/bullet.png');
        game.load.image('enemy1', './assets/plane/enemy1.png');
        game.load.image('enemy2', './assets/plane/enemy2.png');
        game.load.image('enemy3', './assets/plane/enemy3.png');
        game.load.spritesheet('explode1', './assets/plane/explode1.png', 20, 20, 3);
        game.load.spritesheet('explode2', './assets/plane/explode2.png', 30, 30, 3);
        game.load.spritesheet('explode3', './assets/plane/explode3.png', 50, 50, 3);
        game.load.spritesheet('myexplode', './assets/plane/myexplode.png', 40, 40, 3);
        game.load.image('award', './assets/plane/award.png');
        game.load.audio('normalback', './assets/plane/normalback.mp3');
        game.load.audio('playback', './assets/plane/playback.mp3');
        game.load.audio('fashe', './assets/plane/fashe.mp3');
        game.load.audio('crash1', './assets/plane/crash1.mp3');
        game.load.audio('crash2', './assets/plane/crash2.mp3');
        game.load.audio('crash3', './assets/plane/crash3.mp3');
        game.load.audio('ao', './assets/plane/ao.mp3');
        game.load.audio('pi', './assets/plane/pi.mp3');
        game.load.audio('deng', './assets/plane/deng.mp3');
    }

    this.create = function () {
        game.state.start('start')
    }
}

game.States.start = function () {
    let bgMusic;
    this.create = function () {
        game.add.image(0, 0, 'bg').scale.set(scaleVal, scaleVal);
        game.add.image(game.world.centerX, game.world.height - 10, 'copyright').anchor.set(0.5, 0.5)
        const plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane')
        plane.anchor.set(0.5, 0.5)
        plane.animations.add('fly')
        plane.animations.play('fly', 15, true)
        game.add.button(game.world.centerX, (game.world.height / 2) + 50, 'startbutton', this.onStartClick, this, 1, 0, 1, 0).anchor.set(0.5, 0.5)
        bgMusic = game.add.audio('normalback', 0.2, true);
        bgMusic.play()
    }
    this.onStartClick = function () {
        game.state.start('play');
        bgMusic.destroy();
    }
}
game.States.end = function () {
    this.create = function () {
        game.add.image(0, 0, 'bg').scale.set(scaleVal, scaleVal);
        const text = game.add.text(game.world.centerX, game.world.centerY, `Score: ${num}`, {
            font: '20px',
            fill: 'red'
        });
        const button = game.add.button(game.world.centerX, game.world.centerY + 50, 'replaybutton', () => {
            game.state.start('play')
        }, this, 1, 0, 1, 0)
        text.anchor.set(0.5, 0.5)
        button.anchor.set(0.5, 0.5)
    }
}

game.States.play = function () {
    let plane;
    let text;
    let myBulletGroup;
    let lastTime = new Date().getTime();
    let lastTime2 = new Date().getTime();
    let lastTime3 = new Date().getTime();
    let nowTime = new Date().getTime();
    let enemyGroup;
    let enemyBulletGroup;
    let enemyBoomGroup;
    let bgMusic;
    let fireAudio;
    let boomAudio;
    let level = 0;
    this.create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        const bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg')
        bg.autoScroll(0, 20);
        bg.scale.set(scaleVal, scaleVal)
        plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane')
        plane.anchor.set(0.5, 0.5)
        plane.animations.add('fly')
        plane.animations.play('fly', 15, true)
        const tween = game.add.tween(plane).to({
            y: game.world.height - 20
        }, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(onStart);

        bgMusic = game.add.audio('playback', 0.2, true);
        bgMusic.play()
        fireAudio = game.add.audio('pi', 3, false);
        boomAudio = game.add.audio('crash1', 3, false);

        enemyGroup = game.add.group();
        enemyBulletGroup = game.add.group();
        enemyBoomGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyBulletGroup.enableBody = true;
        enemyBoomGroup.enableBody = true;
    }

    this.update = function () {
        nowTime = new Date().getTime();
        level = num / 10;
        createEnemy();
        enemyFire();
        planeFire();
        game.physics.arcade.overlap(enemyGroup, myBulletGroup, hitEnemy)
        game.physics.arcade.overlap(enemyGroup, plane, hitPlane);
        game.physics.arcade.overlap(enemyBulletGroup, plane, hitEnemyBullet);
    }

    function hitEnemyBullet(bullet, plane) {
        bullet.kill();
        onEnd();
    }

    function enemyFire() {
        const dis = nowTime - lastTime3;
        enemyGroup.forEachAlive(function (enemy) {
            if (dis > gameConfig.enemyFireDis) {
                let enemyBullet = enemyBulletGroup.getFirstExists(false)
                if (enemyBullet) {
                    enemyBullet.reset(enemy.x, enemy.y);
                } else {
                    enemyBullet = enemyBulletGroup.create(enemy.x, enemy.y, 'bullet');
                }
                enemyBullet.body.velocity.y = enemy.fireSpeed;
                enemyBullet.checkWorldBounds = true;
                enemyBullet.outOfBoundsKill = true;
                lastTime3 = new Date().getTime();
            }
        })
    }

    function hitPlane(enemy, plane) {
        boomAudio.play()
        enemy.kill();
        onEnd();
    }

    function hitEnemy(enemy, bullet) {
        boomAudio.play()
        enemy.kill();
        bullet.kill();
        let boomImg = enemyBoomGroup.getFirstExists(false)
        if (boomImg) {
            boomImg.reset(enemy.x, enemy.y)
        } else {
            boomImg = game.add.sprite(enemy.x, enemy.y, 'explode' + enemy.type);
            enemyBoomGroup.add(boomImg)
        }
        const ani = boomImg.animations.add('boom')
        ani.play(10, false, true);
        text.text = `Score: ${(num += 10)}   LEVEL: ${level}`;
    }

    function createEnemy() {
        const dis = nowTime - lastTime2;
        if (!plane.isFire || dis <= gameConfig.enemyCreateDis) {
            return
        }
        var enemy = enemyGroup.getFirstExists(false)
        if (enemy) {
            enemy.reset(Math.random() * game.world.width, 0)
        } else {
            const type = Math.ceil(Math.random() * 2 + 1);
            enemy = enemyGroup.create(Math.random() * game.world.width, -50, 'enemy' + type);
            enemy.type = type;
        }
        enemy.anchor.set(0.5, 0.5);
        enemy.body.velocity.y = gameConfig.enemyMoveSpeed;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.fireSpeed = gameConfig.enemyBulletSpeed + enemy.type * 20;

        lastTime2 = new Date().getTime();
    }

    function planeFire() {
        const dis = nowTime - lastTime;
        if (!plane.isFire || dis <= gameConfig.planeFireDis) {
            return
        }
        fireAudio.play();
        let bullet = myBulletGroup.getFirstExists(false);
        if (bullet) {
            bullet.reset(plane.x, plane.y);
        } else {
            bullet = myBulletGroup.create(plane.x, plane.y, 'mybullet');
        }

        if (level >= 1) {
            let bullet = myBulletGroup.getFirstExists(false);
            if (bullet) {
                bullet.reset(plane.x, plane.y);
            } else {
                bullet = myBulletGroup.create(plane.x, plane.y, 'mybullet');
            }
            bullet.body.velocity.y = -gameConfig.planeBulletSpeed;
            bullet.body.velocity.x = -20;
        }

        if (level >= 5) {
            let bullet = myBulletGroup.getFirstExists(false);
            if (bullet) {
                bullet.reset(plane.x, plane.y);
            } else {
                bullet = myBulletGroup.create(plane.x, plane.y, 'mybullet');
            }
            bullet.body.velocity.y = -gameConfig.planeBulletSpeed;
            bullet.body.velocity.x = 20;
        }

        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;
        bullet.body.velocity.y = -gameConfig.planeBulletSpeed;
        lastTime = new Date().getTime();
    }

    function onEnd() {
        const boom = game.add.sprite(plane.x, plane.y, 'myexplode')
        const boomAn = boom.animations.add('boom');
        boomAn.play(10, false, true)
        boomAn.onComplete.add(function () {
            plane.kill();
            bgMusic.destroy();
            game.state.start('end');
        })
    }

    function onStart() {
        plane.inputEnabled = true;
        plane.input.enableDrag(true);
        text = game.add.text(0, 0, `Score: ${num}   LEVEL: ${level}`, {
            font: '16px',
            fill: '#000'
        });
        plane.isFire = true;
        game.physics.enable(plane, Phaser.Physics.ARCADE)
        plane.body.colliderWorldBounds = true;
        myBulletGroup = game.add.group();
        myBulletGroup.enableBody = true;
    }
}

game.state.add('boot', game.States.boot)
game.state.add('preload', game.States.preload)
game.state.add('start', game.States.start)
game.state.add('play', game.States.play)
game.state.add('end', game.States.end)
game.state.start('boot')