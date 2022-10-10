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
        game.add.image(0, 0, 'bg')
    }
}

game.state.add('boot', game.States.boot)
game.state.add('preload', game.States.preload)
game.state.start('boot')