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

function colorize(number, $tag) {
  if (number < 10) {
    $tag.style.backgroundColor = "red";
    $tag.style.color = "white";
  } else if (number < 20) {
    $tag.style.backgroundColor = "orange";
    $tag.style.color = "white";
  } else if (number < 30) {
    $tag.style.backgroundColor = "darkkhaki";
    $tag.style.color = "white";
  } else if (number < 40) {
    $tag.style.backgroundColor = "blue";
    $tag.style.color = "white";
  } else {
    $tag.style.backgroundColor = "green";
    $tag.style.color = "white";
  }
}

const drawBall = (number, $parent) => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = number;
  colorize(number, $ball);
  $parent.appendChild($ball);
};

for (let i = 0; i < winBalls.length; i++)
  setTimeout(() => {
    drawBall(winBalls[i], $balls);
  }, (i + 1) * 1000);

setTimeout(() => {
  drawBall(bonus, $bonusBall);
}, 7000);
