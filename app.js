"use strict";

const candidate = Array(45)
  .fill()
  .map((el, idx) => idx + 1);

const shuffle = [];
for (let i = candidate.length; i > 0; i--) {
  const random = Math.floor(Math.random() * i);
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0];
  shuffle.push(value);
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $balls = document.querySelector(".balls");
const $bonusBall = document.querySelector(".bonusBall");

const showBall = (number, $target) => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = number;
  $target.appendChild($ball);
};

for (let i = 0; i < winBalls.length; i++)
  setTimeout(() => {
    showBall(winBalls[i], $balls);
  }, (i + 1) * 1000);

setTimeout(() => {
  showBall(bonus, $bonusBall);
}, 7000);
