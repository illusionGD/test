"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var EnemyFactory=function(){function e(){_classCallCheck(this,e),this.config={moveSpeed:100,createDis:1e3,scale:.5,maxCount:1},this.lasTime=(new Date).getTime(),this.init()}return _createClass(e,[{key:"init",value:function(){this.isDead=!1,this.enemyGroup=game.add.group(),this.enemyGroup.enableBody=!0}},{key:"move",value:function(e,t){var a=this,o=0<arguments.length&&void 0!==e?e:0,s=1<arguments.length&&void 0!==t?t:0;this.enemyGroup.forEachAlive(function(e){var t=computeVector(o,s,e.x,e.y),i=t.x,n=t.y;e.body.velocity.x=i*a.config.moveSpeed,e.body.velocity.y=n*a.config.moveSpeed,0<i?e.animations.play("right"):e.animations.play("left")})}},{key:"createEnemy",value:function(e,t){var i;(new Date).getTime()-this.lasTime>this.config.createDis&&this.config.maxCount>this.enemyGroup.total&&((i=this.enemyGroup.getFirstExists(!1))||((i=this.enemyGroup.create(e,t,keyMap.enemy)).scale.set(.6,.6),i.anchor.set(.5,1),i.body.setSize(i.width,i.height),i.shakeTween=game.add.tween(i).to({rotation:.2},1e3,Phaser.Easing.Cubic.In,!0),i.shakeTween.yoyo(!0),i.shakeTween.repeat(),i.animations.add("left",[0],5,!0),i.animations.add("right",[1],5,!0)),i.reset(e,t),i.body.collideWorldBounds=!0,this.lasTime=(new Date).getTime())}},{key:"stop",value:function(){this.enemyGroup.forEachAlive(function(e){e.body.velocity.x=0,e.body.velocity.y=0,e.shakeTween.pause()})}}]),e}();