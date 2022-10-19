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
    // ball: 'ball',
    // skillImage: 'skill_image',
    // skillAtlas: 'skill_atlas',
    // skillJson: 'skill_json',
    topTimeBg: 'topTimeBg',
    tornado: 'tornado',
    fireBall: 'fireBall',
    tornadoRotation: 'skl7_5_target_1'
}

const skillList = [];

var game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'game');


game.state.add('preloadState', preloadState)
game.state.add('gameStartState', gameStartState)
// game.state.add('gamePlayState', gamePlayState)
// game.state.add('gameEndState', gameEndState)
game.state.start('preloadState', preloadState);

bindEvent();

function bindEvent() {
    document.querySelector('.btn-skill1').addEventListener('click', (e) => {
        if (hadSkill('1')) {
            return;
        }
        skillList.push('1');
        e.target.classList.add('btn-skill-gray');
        closePop();
    });
    document.querySelector('.btn-skill2').addEventListener('click', (e) => {
        if (hadSkill('2')) {
            return;
        }
        skillList.push('2');
        e.target.classList.add('btn-skill-gray');
        closePop();
    });
    document.querySelector('.btn-skill3').addEventListener('click', (e) => {
        if (hadSkill('3')) {
            return;
        }
        skillList.push('3');
        e.target.classList.add('btn-skill-gray');
        closePop();
    });
    document.querySelector('.btn-reward').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function hadSkill(skill) {
    return skillList.includes(skill);
}

function closePop() {
    document.querySelector('.pop').style.display = 'none';
}

function showSkillPop() {
    document.querySelector('.skill-pop').style.display = 'flex';
}

function showAwardPop() {
    document.querySelector('.award-pop').style.display = 'block';
}

function docEle(selector) {
    return document.querySelector(selector);
}