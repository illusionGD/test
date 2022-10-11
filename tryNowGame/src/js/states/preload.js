// 游戏加载场景
var preloadState = function () {

    this.preload = function () {}
    this.create = function () {
        game.state.start('gameStartState')
    }

    this.update = function () {

    }
}
