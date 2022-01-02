class Score {
  private sum: number = 0;

  constructor() {
    
  }

  add(num: number) {
    this.sum += num;
  }

  reduce(num: number) {
    if (this.sum <= 0) {
      return;
    }
    this.sum -= num;
  }

  getScore() {
    return this.sum;
  }
}

export default Score;