const game = new Phaser.Game(240, 400, Phaser.CANVAS, 'game');
game.States = {}

game.States.boot = function () {
    this.preload = function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.image('loading', '../assets/plane/preloader.gif');
    }
    this.create = function () {
        game.state.start('preload');
    }
}

game.States.preload = function () {
    this.preload = function () {
        var preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('bg', '../assets/plane/bg.jpg');
        game.load.image('copyright', '../assets/plane/copyright.png');
        game.load.spritesheet('myplane', '../assets/plane/myplane.png', 40, 40, 4);
        game.load.spritesheet('startbutton', '../assets/plane/startbutton.png', 100, 40, 2);
        game.load.spritesheet('replaybutton', '../assets/plane/replaybutton.png', 80, 30, 2);
        game.load.spritesheet('sharebutton', '../assets/plane/sharebutton.png', 80, 30, 2);
        game.load.image('mybullet', '../assets/plane/mybullet.png');
        game.load.image('bullet', '../assets/plane/bullet.png');
        game.load.image('enemy1', '../assets/plane/enemy1.png');
        game.load.image('enemy2', '../assets/plane/enemy2.png');
        game.load.image('enemy3', '../assets/plane/enemy3.png');
        game.load.spritesheet('explode1', '../assets/plane/explode1.png', 20, 20, 3);
        game.load.spritesheet('explode2', '../assets/plane/explode2.png', 30, 30, 3);
        game.load.spritesheet('explode3', '../assets/plane/explode3.png', 50, 50, 3);
        game.load.spritesheet('myexplode', '../assets/plane/myexplode.png', 40, 40, 3);
        game.load.image('award', '../assets/plane/award.png');
        game.load.audio('normalback', '../assets/plane/normalback.mp3');
        game.load.audio('playback', '../assets/plane/playback.mp3');
        game.load.audio('fashe', '../assets/plane/fashe.mp3');
        game.load.audio('crash1', '../assets/plane/crash1.mp3');
        game.load.audio('crash2', '../assets/plane/crash2.mp3');
        game.load.audio('crash3', '../assets/plane/crash3.mp3');
        game.load.audio('ao', '../assets/plane/ao.mp3');
        game.load.audio('pi', '../assets/plane/pi.mp3');
        game.load.audio('deng', '../assets/plane/deng.mp3');
    }

    this.create = function () {
        game.state.start('play')
    }
}

game.States.start = function () {
    this.create = function () {
        game.add.image(0, 0, 'bg')
        game.add.image(game.world.centerX, game.world.height - 10, 'copyright').anchor.set(0.5, 0.5)
        const plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane')
        plane.anchor.set(0.5, 0.5)
        plane.animations.add('fly')
        plane.animations.play('fly', 15, true)
        game.add.button(game.world.centerX, (game.world.height / 2) + 50, 'startbutton', this.onStartClick, this, 1, 0, 1, 0).anchor.set(0.5, 0.5)
    }
    this.onStartClick = function () {
        game.state.start('play')
    }
}

game.States.play = function () {
    let plane;
    let text;
    let myBulletGroup;
    let lastTime = new Date().getTime();
    let enemyGroup;
    let num = 0;
    this.create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        const bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg')
        bg.autoScroll(0, 20);
        plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane')
        plane.anchor.set(0.5, 0.5)
        plane.animations.add('fly')
        plane.animations.play('fly', 15, true)
        const tween = game.add.tween(plane).to({
            y: game.world.height - 20
        }, 1000, Phaser.Easing.Sinusoidal.Out, true);
        tween.onComplete.add(onStart);
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
    }

    this.update = function () {
        const dis = new Date().getTime() - lastTime;
        if (plane.isFire && dis > 500) {
            const bullet = myBulletGroup.create(plane.x, plane.y, 'bullet')
            const enemy = enemyGroup.create(Math.random() * game.world.width, 0, 'enemy1')
            enemy.body.velocity.y = 10;
            bullet.body.velocity.y = -200;
            lastTime = new Date().getTime();
        }

        game.physics.arcade.overlap(enemyGroup, myBulletGroup, colliderCallback)
    }

    function colliderCallback(bullet, enemy) {
        bullet.kill();
        enemy.kill();
        text.text = 'Score: ' + (num += 10);
    }

    function onStart() {
        plane.inputEnabled = true;
        plane.input.enableDrag(true);
        text = game.add.text(0, 0, 'Score: 0', {
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
game.state.start('boot')