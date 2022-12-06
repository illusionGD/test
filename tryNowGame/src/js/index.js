// 计算视口宽高，做一定程度的设配
const screenW = parseInt(window.getComputedStyle(document.getElementById('game')).width);
const screenH = document.documentElement.clientHeight;
/**
 * @description: 资源key集合对象
 */
const keyMap = {
    startBgImg: 'startBgImg',
    playBgImg: 'playBgImg',
    joystick: 'joystick',
    player: 'player',
    playerBullet1: 'playerBullet1',
    enemy: 'enemy',
    popBgImg: 'popBgImg',
    btnClose: 'btnClose',
    gun: 'gun',
    pet: 'pet',
    collide: 'collide',
    knife: 'knife',
    knifeRotation: 'skl4_9_path',
    audioBg: 'audioBg',
    audioFire: 'audioFire',
    audioTornado: 'audioTornado',
    audioHit: 'audioHit',
    audioArrow: 'audioArrow',
    audioKnife: 'audioKnife',
    ax: 'ax',
    audioAx: 'audioAx',
    audioFail: 'audioFail',
    audioDead: 'audioDead',
    audioSuccess: 'audioSuccess',
    // ball: 'ball',
    // skillImage: 'skill_image',
    // skillAtlas: 'skill_atlas',
    // skillJson: 'skill_json',
    topTimeBg: 'topTimeBg',
    tornado: 'tornado',
    fireBall: 'fireBall',
    tornadoRotation: 'skl7_5_target_1'
}


var game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'game');

var bootState = function () {
    this.preload = function () {
        game.load.image(keyMap.startBgImg, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/bg.jpg');
    }

    this.create = function () {
        game.state.start('preloadState');
    }
}

var preloadState = function () {
    var graphics;
    var loadText;
    this.preload = function () {
        game.add.image(0, 0, keyMap.startBgImg);
        // game.add.plugin(Fabrique.Plugins.Spine);
        graphics = game.add.graphics();
        loadText = game.add.text(game.world.centerX, game.world.centerY + 50, '0%', {
            fill: '#fff'
        });
        game.load.audio(keyMap.audioBg, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_bg.mp3');
        game.load.audio(keyMap.audioFire, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_fire.mp3');
        // game.load.audio(keyMap.audioArrow, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_arrow.mp3');
        game.load.audio(keyMap.audioKnife, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_knife.mp3');
        game.load.audio(keyMap.audioHit, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_hit.mp3');
        game.load.audio(keyMap.audioAx, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_ax.mp3');
        game.load.audio(keyMap.audioFail, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_fail.mp3?v=1.0');
        game.load.audio(keyMap.audioSuccess, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_success.mp3');
        // game.load.audio(keyMap.audioTornado, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/audio/audio_tornado.mp3');
        // game.load.image(keyMap.startBgImg, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/bg.jpg');
        game.load.image(keyMap.playerBullet1, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/arrow.png');
        game.load.image(keyMap.topTimeBg, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/top_time.png');
        // game.load.image(keyMap.collide, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/collide.png');
        game.load.spritesheet(keyMap.gun, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/arrow.png');
        game.load.spritesheet(keyMap.pet, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/pet.png', 131, 151, 2);
        game.load.spritesheet(keyMap.enemy, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/enemy.png', 48, 61, 4);
        game.load.spritesheet(keyMap.fireBall, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/fire_1.png', 299, 158, 4);
        // game.load.spritesheet(keyMap.fireBall, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/fire_ball1.png', 856, 733, 4);
        game.load.spritesheet(keyMap.knife, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/knife.png', 145, 144, 6);
        // game.load.spritesheet(keyMap.tornado, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/tornado.png', 289, 213, 20);
        game.load.spritesheet(keyMap.player, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/role.png', 40, 64, 2);
        game.load.spritesheet(keyMap.ax, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/ax.png', 1246, 1223, 1);
        // game.load.spritesheet(keyMap.player, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/player.png', 443, 668, 2);

        game.load.atlas(keyMap.joystick, 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/images/joystick_1.png', 'https://ressa-download.vsplay.com/eaysfj/tryNowGame/assets/json/joystick.json');
        game.load.onFileComplete.add(onLoading);
    }

    this.create = function () {
        game.state.start('gamePlayState');
    }

    function onLoading(progress) {
        graphics.beginFill(0xffffff);
        graphics.drawRect(10, game.world.centerY, game.world.width * (progress / 100) - 20, 10);
        loadText.text = `${progress}%`;
    }
}

var gameStartState = function () {
    this.preload = function () {
        game.add.image(0, 0, keyMap.startBgImg);
        // game.add.button(0, 0, keyMap.startBgImg);
    }
    this.create = function () {
        document.querySelector('.btns').style.display = 'block';
        document.querySelector('.btn-start').addEventListener('click', start);
        document.querySelector('.btn-config').addEventListener('click', actionOnClick);
    }

    function start() {
        game.state.start('gamePlayState');
        document.querySelector('.btns').style.display = 'none';
    }

    function actionOnClick() {
        document.querySelector('.options-pop').style.display = 'flex';
    }
}

game.state.add('bootState', bootState);
game.state.add('preloadState', preloadState);
game.state.add('gameStartState', gameStartState);
game.state.add('gamePlayState', gamePlayState);
game.state.start('bootState', preloadState);

// initGameConfig();

// function initGameConfig() {
//     const baseConfig = getConfig('baseConfig');
//     const roleConfig = getConfig('roleConfig');
//     const tornadoConfig = getConfig('tornadoConfig');
//     const fireConfig = getConfig('fireConfig');
//     const knifeConfig = getConfig('knifeConfig');
//     const axConfig = getConfig('axConfig');
//     const enemyConfig = getConfig('enemyConfig');
//     const enemyConfig2 = getConfig('enemyConfig2');
//     const enemyConfig3 = getConfig('enemyConfig3');

//     const baseConfigDom = document.querySelectorAll('.base-options input');
//     const roleConfigDom = document.querySelectorAll('.role-options input');
//     const tornadoConfigDom = document.querySelectorAll('.tornado-options input');
//     const fireConfigDom = document.querySelectorAll('.fire-options input');
//     const knifeConfigDom = document.querySelectorAll('.knife-options input');
//     const axConfigDom = document.querySelectorAll('.ax-options input');

//     baseConfigDom.forEach(item => {
//         item.setAttribute('value', baseConfig[item.getAttribute('id')] || 0)
//     });
//     roleConfigDom.forEach(item => {
//         item.setAttribute('value', roleConfig[item.getAttribute('id')] || 0)
//     });
//     tornadoConfigDom.forEach(item => {
//         item.setAttribute('value', tornadoConfig[item.getAttribute('id')] || 0)
//     });
//     fireConfigDom.forEach(item => {
//         item.setAttribute('value', fireConfig[item.getAttribute('id')] || 0)
//     });
//     knifeConfigDom.forEach(item => {
//         item.setAttribute('value', knifeConfig[item.getAttribute('id')] || 0)
//     });
//     axConfigDom.forEach(item => {
//         item.setAttribute('value', axConfig[item.getAttribute('id')] || 0)
//     });

//     document.getElementById('enemyMoveSpeed').value = enemyConfig.moveSpeed;
//     document.getElementById('enemyCreateNum').value = enemyConfig.createNum;
//     document.getElementById('enemyCreateDis').value = enemyConfig.createDis;
//     document.getElementById('enemyMaxCount').value = enemyConfig.maxCount;
//     document.getElementById('enemyLife').value = enemyConfig.life;
//     document.getElementById('createScope').value = enemyConfig.createScope || 2;
//     document.getElementById('juryTime').value = enemyConfig.juryTime || 500;
//     document.getElementById('deadTime').value = enemyConfig.deadTime || 200;
//     document.getElementById('deadDis').value = enemyConfig.deadDis || 4;

//     document.getElementById('enemyMoveSpeed2').value = enemyConfig2.moveSpeed;
//     document.getElementById('enemyCreateNum2').value = enemyConfig2.createNum;
//     document.getElementById('enemyCreateDis2').value = enemyConfig2.createDis;
//     document.getElementById('enemyLife2').value = enemyConfig2.life;

//     document.getElementById('enemyMoveSpeed3').value = enemyConfig3.moveSpeed;
//     document.getElementById('enemyCreateNum3').value = enemyConfig3.createNum;
//     document.getElementById('enemyCreateDis3').value = enemyConfig3.createDis;
//     document.getElementById('enemyLife3').value = enemyConfig3.life;
// }

// document.querySelector('.config-confirm').addEventListener('click', () => {
//     const baseConfigDom = document.querySelectorAll('.base-options input');
//     const roleConfigDom = document.querySelectorAll('.role-options input');
//     const tornadoConfigDom = document.querySelectorAll('.tornado-options input');
//     const fireConfigDom = document.querySelectorAll('.fire-options input');
//     const knifeConfigDom = document.querySelectorAll('.knife-options input');
//     const axConfigDom = document.querySelectorAll('.ax-options input');

//     const baseConfig = {}

//     baseConfigDom.forEach(item => {
//         baseConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const roleConfig = {}

//     roleConfigDom.forEach(item => {
//         roleConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const tornadoConfig = {}

//     tornadoConfigDom.forEach(item => {
//         tornadoConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const fireConfig = {}

//     fireConfigDom.forEach(item => {
//         fireConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const knifeConfig = {}

//     knifeConfigDom.forEach(item => {
//         knifeConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const axConfig = {}

//     axConfigDom.forEach(item => {
//         axConfig[item.getAttribute('id')] = Number(item.value) || 0;
//     });

//     const enemyConfig = {
//         moveSpeed: Number(document.getElementById('enemyMoveSpeed').value) || 100,
//         createDis: Number(document.getElementById('enemyCreateDis').value) || 800,
//         createNum: Number(document.getElementById('enemyCreateNum').value) || 1,
//         maxCount: Number(document.getElementById('enemyMaxCount').value) || 80,
//         life: Number(document.getElementById('enemyLife').value) || 1,
//         juryTime: Number(document.getElementById('juryTime').value) || 500,
//         deadTime: Number(document.getElementById('deadTime').value) || 200,
//         deadDis: Number(document.getElementById('deadDis').value) || 4,
//         createScope: Number(document.getElementById('createScope').value) || 2
//     }

//     const enemyConfig2 = {
//         moveSpeed: Number(document.getElementById('enemyMoveSpeed2').value) || 100,
//         createDis: Number(document.getElementById('enemyCreateDis2').value) || 800,
//         createNum: Number(document.getElementById('enemyCreateNum2').value) || 1,
//         life: Number(document.getElementById('enemyLife2').value) || 1
//     }

//     const enemyConfig3 = {
//         moveSpeed: Number(document.getElementById('enemyMoveSpeed3').value) || 100,
//         createDis: Number(document.getElementById('enemyCreateDis3').value) || 800,
//         createNum: Number(document.getElementById('enemyCreateNum3').value) || 1,
//         life: Number(document.getElementById('enemyLife3').value) || 1
//     }

//     setLocalStorage('baseConfig', baseConfig);
//     setLocalStorage('roleConfig', roleConfig);
//     setLocalStorage('tornadoConfig', tornadoConfig);
//     setLocalStorage('fireConfig', fireConfig);
//     setLocalStorage('knifeConfig', knifeConfig);
//     setLocalStorage('axConfig', axConfig);
//     setLocalStorage('enemyConfig', enemyConfig);
//     setLocalStorage('enemyConfig2', enemyConfig2);
//     setLocalStorage('enemyConfig3', enemyConfig3);
//     document.querySelector('.options-pop').style.display = 'none';
// })

document.querySelector('.options-pop').addEventListener('click', () => {
    document.querySelector('.options-pop').style.display = 'none'
});

document.querySelector('.options-pop .pop-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

const skillDomList = document.querySelectorAll('.btn-skill');