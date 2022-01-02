class Snake {
  private head: HTMLElement;
  private direction: string = 'right';
  private bodies: HTMLElement;
  dis: number = 10;
  private timer: any;
  dirtArray = ['right', 'left', 'up', 'down'];
  speed = 100;

  constructor() {
    this.bodies = document.querySelector('#snake')!;
    console.log(this.bodies)
    this.head = this.bodies.children[0] as HTMLElement;
  }

  getX(){
    return this.head.offsetLeft;
  }

  getY() {
    return this.head.offsetTop;
  }

  setX(x: number) {
    this.head.style.left = x + 'px';
  }

  setY(y: number) {
    this.head.style.top = y + 'px';
  }

  addBody() {
    const child = document.createElement('div');
    const list = this.bodies.children[this.bodies.children.length - 1] as HTMLElement;

    if (this.direction === 'right' || this.direction === 'left') {
      child.style.left = parseInt(list.style.left) - this.dis + 'px';
      child.style.top = list.style.top;
    } else {
      child.style.left = list.style.left;
      child.style.top = parseInt(list.style.top) - this.dis + 'px';
    }


    this.bodies.appendChild(child);
    console.log(this.bodies)
  }

  changeDirction(dirction: string) {
    if (this.dirtArray.includes(dirction)) {
      this.direction = dirction;
    }
  }

  move(callback: Function) {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(()=> {
      let _left = parseInt(this.head.style.left) || 0;
      let _top = parseInt(this.head.style.top) || 0;

      switch(this.direction) {
        case 'right': 
          this.head.style.left = _left + this.dis + 'px';
          break;
        case 'left': 
          this.head.style.left = _left - this.dis + 'px';
          break;
        case 'down': 
          this.head.style.top = _top + this.dis + 'px';
          break;
        case 'up': 
          this.head.style.top = _top - this.dis + 'px';
          break;
        default: break;
      }

      callback({
        x: this.head.offsetLeft,
        y: this.head.offsetTop
      });
    }, this.speed)
  }

  addSpeed(disSpeed: number) {
    this.speed -= disSpeed;
  }

  stopMove() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

export default Snake;