'use strict';

const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 개수를 짝수로 입력하세요(최대 20).'));
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'white',
  'pink',
  'cyan',
  'violet',
  'gray',
  'black',
];
let colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice); // 6가지 색 두 번 해서 12장 사용하기 때문
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card';
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

function onClickCard() {
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    // 위의 세 줄과 같음 completed = completed.concat(clicked);
    if (completed.length !== total) {
      return;
    }
    const endTime = new Date();
    setTimeout(() => {
      alert(`축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다.`);
      resetGame();
    }, 1000);
    return;
  }
  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 500);
}

function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
    startTime = new Date();
  }, 5000);
}
startGame();

function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}
