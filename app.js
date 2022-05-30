'use strict';

const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $scissors = document.querySelector('#scissors');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
};
let intervalId = setInterval(changeComputerHand, 50);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let me = 0;
let computer = 0;
let clickable = true;
const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;

    const myChoice =
      event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    console.log(myScore, computerScore);
    const diff = myScore - computerScore;

    let message;

    if ([2, -1].includes(diff)) {
      me += 1;
      message = '승리';
    } else if ([-2, 1].includes(diff)) {
      computer += 1;
      message = '패배';
    } else {
      message = '무승부';
    }
    if (me >= 3) {
      $score.textContent = `나의 승리 ${me} : ${computer}`;
    } else if (computer >= 3) {
      $score.textContent = `컴퓨터의 승리 ${me} : ${computer}`;
    } else {
      $score.textContent = `${message} 총 ${me}점`;
      setTimeout(() => {
        // clearInterval(intervalId);s
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
    }
  }
};

$scissors.addEventListener('click', clickButton);
$rock.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
