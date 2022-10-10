const game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
});

const keyMap = {
    role: 'role'
}
var text;
var player;
var cursors;
// 计数器
var counter = 0;

function preload() {
    game.load.spritesheet(keyMap.role, '../images/dude.png', 32, 48);
}

function create() {
    player = game.add.sprite(32, 100, keyMap.role);
    player.frame = 4;
    player.anchor.set(0.5);
    player.inputEnabled = true;
    player.input.enableDrag();
    // 拖拽事件
    player.events.onDragStart.add(dragStart);
    player.events.onDragUpdate.add(dragUpdate);
    player.events.onDragStop.add(dragStop);
    cursors = game.input.keyboard.createCursorKeys();
}

function dragStart() {
    console.log('start');
}

function dragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    console.log("🚀 ~ file: index.js ~ line 37 ~ sprite", sprite)
    console.log("🚀 ~ file: index.js ~ line 37 ~ snapPoint", snapPoint)
    console.log("🚀 ~ file: index.js ~ line 37 ~ dragY", dragY)
    console.log("🚀 ~ file: index.js ~ line 37 ~ dragX", dragX)
    console.log("🚀 ~ file: index.js ~ line 37 ~ pointer", pointer)
}

function dragStop() {
    console.log('stop');
}

function update() {
    if (cursors.left.isDown) {
        console.log(1);
    }
    // 按键逻辑
    if (cursors.left.isDown) {
        player.x -= 10;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.x += 10;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

}

function listener() {
    // 计数
    counter++;
    // 修改文本
    text.text = "You clicked " + counter + " times!";
}