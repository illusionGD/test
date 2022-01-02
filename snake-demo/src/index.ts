import './css/index.less';
import GameControl from './modules/GameControl';

const gameControl = new GameControl();

const stopBtn = document.querySelector('.stopBtn')!;
const startBtn = document.querySelector('.startBtn')!;
startBtn.addEventListener('click', ()=> gameControl.startGame());
stopBtn.addEventListener('click', ()=> gameControl.stopGame());