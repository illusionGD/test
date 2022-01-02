class Food {
  private el: HTMLElement;
  private limitX: number = 500;
  private limitY: number = 500;
  private width: number = 10;
  private height: number = 10;

  constructor() {
    this.el = document.getElementById('food')!;
    this.init();
  }

  getX(){
    return this.el.offsetLeft;
  }

  getY() {
    return this.el.offsetTop;
  }

  getWidth() {
    return this.el.style.width;
  }

  getHeight() {
    return this.el.style.height;
  }

  // 设置位置
  setPosition(x: number, y: number) {
    x = x >= this.limitX ? x - this.width : x;
    y = y >= this.limitY ? x - this.height : y;
    this.el.style.left = x + 'px'; 
    this.el.style.top = y + 'px'; 
  }
  // 初始化
  init() {
    const initX = Math.round(Math.random()*5)*100;
    const initY = Math.round(Math.random()*5)*100;
    console.log(initX, initY)
    this.setPosition(initX, initY);
  }
}

export default Food;
