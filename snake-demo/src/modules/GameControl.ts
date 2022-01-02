import Food from './Food';
import Score from './Score';
import Snake from './Snake';

class GameControl {
  food: Food;
  snake: Snake;
  score: Score;
  private direction = '';
  limitX: number = 490;
  limitY: number = 490;

  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.score = new Score();
    this.init();
  }

  init() {
    window.addEventListener('keydown', this.keyDownHandler.bind(this));
  }

  keyDownHandler(e: KeyboardEvent) {
    let dirt = '';

    switch(e.key) {
      case 'w': 
        dirt = 'up';
        break;
      case 's': 
        dirt = 'down'
        break;
      case 'a': 
        dirt = 'left'
        break;
      case 'd': 
        dirt = 'right'
        break;
      default: break;
    }
    this.snake.changeDirction(dirt);
  }

  checkCollision(position: {x: number, y: number}) {
    if (position.x > this.limitX || position.x < 0 || position.y > this.limitY || position.y < 0) {
      this.stopGame();
      if (position.x > this.limitX) {
        this.snake.setX(position.x - this.snake.dis);
      } else if (position.x < 0) {
        this.snake.setX(position.x + this.snake.dis);
      } else if (position.y < 0) {
        this.snake.setY(position.y + this.snake.dis);
      } else if (position.y > this.limitY) {
        this.snake.setY(position.y - this.snake.dis);
      }
    }

    if (position.x === this.food.getX() && position.y === this.food.getY()) {
      this.food.init()
      this.score.add(1)
      this.snake.addBody();
    }
  }

  startGame() {
    this.snake.move(this.checkCollision.bind(this));
  }

  stopGame() {
    this.snake.stopMove();
  }
}

export default GameControl;