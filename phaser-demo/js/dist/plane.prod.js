"use strict";var audios,screenW=parseInt(window.getComputedStyle(document.getElementById("game")).width),screenH=document.documentElement.clientHeight,game=new Phaser.Game(screenW,screenH,Phaser.CANVAS,"game"),scaleVal=screenH/400<screenW/240?screenW/240:screenH/400,gameConfig={planeFireDis:500,enemyFireDis:1e3,enemyCreateDis:1e3,enemyMoveSpeed:20,enemyBulletSpeed:30,planeBulletSpeed:200},num=0;game.States={},game.States.boot=function(){this.preload=function(){game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,game.load.image("loading","./assets/plane/preloader.gif")},this.create=function(){game.state.start("preload")}},game.States.preload=function(){this.preload=function(){game.add.plugin(Fabrique.Plugins.Spine);var e=game.add.sprite(10,game.height/2,"loading");game.load.setPreloadSprite(e),game.load.image("bg","./assets/plane/bg.jpg"),game.load.image("copyright","./assets/plane/copyright.png"),game.load.spritesheet("myplane","./assets/plane/myplane.png",40,40,4),game.load.spritesheet("startbutton","./assets/plane/startbutton.png",100,40,2),game.load.spritesheet("replaybutton","./assets/plane/replaybutton.png",80,30,2),game.load.spritesheet("sharebutton","./assets/plane/sharebutton.png",80,30,2),game.load.image("mybullet","./assets/plane/mybullet.png"),game.load.image("bullet","./assets/plane/bullet.png"),game.load.image("enemy1","./assets/plane/enemy1.png"),game.load.image("enemy2","./assets/plane/enemy2.png"),game.load.image("enemy3","./assets/plane/enemy3.png"),game.load.spritesheet("explode1","./assets/plane/explode1.png",20,20,3),game.load.spritesheet("explode2","./assets/plane/explode2.png",30,30,3),game.load.spritesheet("explode3","./assets/plane/explode3.png",50,50,3),game.load.spritesheet("myexplode","./assets/plane/myexplode.png",40,40,3),game.load.image("award","./assets/plane/award.png"),game.load.spine("fen","./assets/plane/spine7_2_skl7_5_target_1.json")},this.create=function(){game.state.start("start")}},game.States.start=function(){this.create=function(){game.add.spine(100,100,"fen").setAnimationByName(0,"skl7_5_target_1",!0)}},game.state.add("boot",game.States.boot),game.state.add("preload",game.States.preload),game.state.add("start",game.States.start),game.state.start("boot");