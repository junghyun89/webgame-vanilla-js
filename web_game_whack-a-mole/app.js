'use strict';

const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $life = document.querySelector('#life');
const $start = document.querySelector('#start');
const $info = document.querySelector('#info');
const $$cells = document.querySelectorAll('.cell');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 10;
let life = 3;
let timerId;
let tickId;

$start.addEventListener('click', () => {
  if (started) return; // 이미 시작했으면 무시
  started = true;
  clearInterval(timerId);
  console.log('시작');
  timerId = setInterval(() => {
    time = (time * 10 - 1) / 10; // 소수점 계산 시 문제있음
    $timer.textContent = `제한시간 : ${time}초`;
    if (time === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`게임 오버! 점수는 ${score}점`);
      }, 50);
      setTimeout(() => {
        started = false;
        time = 10;
        life = 3;
        score = 0;
        $score.textContent = `점수 : 0`;
        $life.textContent = `목숨 : ${life}`;
      }, 50);
    }
  }, 100);

  time = time;
  $timer.textContent = time;
  tickId = setInterval(tick, 1000);
  tick();
});

let gopherPercent = 0.3;
let bombPercent = 0.5; // 폭탄 20% (누적값으로 계산)
function tick() {
  holes.forEach((hole, index) => {
    if (hole) return;
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $gopher = $$cells[index].querySelector('.gopher');
      holes[index] = setTimeout(() => {
        $gopher.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove('hidden');
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb');
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove('hidden');
    }
  });
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector('.gopher').addEventListener('click', (event) => {
    if (!event.target.classList.contains('dead')) {
      score += 1;
      $score.textContent = `점수 : ${score}`;
    }
    event.target.classList.add('dead');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('dead');
    }, 1000);
  });

  $cell.querySelector('.bomb').addEventListener('click', (event) => {
    if (!event.target.classList.contains('boom')) {
      life--;
      $life.textContent = `목숨 : ${life}`;
    }
    event.target.classList.add('boom');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('boom');
    }, 1000);
    if (life === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`게임 오버! 점수는 ${score}점`);
      }, 50);
      setTimeout(() => {
        started = false;
        time = 10;
        life = 3;
        score = 0;
        $score.textContent = `점수 : 0`;
        $life.textContent = `목숨 : ${life}`;
      }, 50);
    }
  });
});
