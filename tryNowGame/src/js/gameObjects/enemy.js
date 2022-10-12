class Enemy {
    constructor() {
        this.config = {
            moveSpeed: 200,
            createDis: 500
        }

        this.createTime = new Date.getTime();
        this.init();
    }

    init() {
        this.isDead = false;
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
    }

    move() {

    }

    dead() {

    }
}